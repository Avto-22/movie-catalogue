import { catchError, map, takeUntil } from 'rxjs/operators';
import { MovieDetailsFnService } from './movie-details-fn.service';
import { Injectable } from '@angular/core';
import { MovieDetailsComponent } from '../movie-details.component';
import { LoadingService } from 'src/app/services/loading.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { AddMovieBody, DetailsMovieBody } from '../../catalogue.model';
import { of, switchMap, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsFacadeService {

constructor(
  // private movieDetailsFnService:MovieDetailsFnService, Circular dependency in DI ERROR
  private loadingServie:LoadingService,
  private firestore: AngularFirestore,
  private authService: AuthService,
) { }

getMovieForDetails(movieDetails:MovieDetailsComponent) {
  movieDetails.movieDetailsFnService.checkMovieId(movieDetails);
  this.loadingServie.start();
  this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService.userId)).doc(movieDetails.movieId).get()
    .pipe(
      takeUntil(movieDetails.endSubj_),
      map<any, AddMovieBody>(result => result.data()),
      catchError(x=>{
        return of(x);
      })
    )
    .pipe(
      switchMap(result => movieDetails.movieApiService.getMovieByImdbId(result.imdbID).pipe(
        switchMap(baseMovie => {
          let countrys = baseMovie.Country.split(', ');
          return forkJoin(countrys.map(res => movieDetails.movieApiService.getCountry(res).pipe(
            map(countryResult => {
              return {
                population: countryResult.population,
                flags: countryResult.flags
              };
            }),
            catchError(x => of({
              population: null,
              flags: null,
            }))
          ))).pipe(
            catchError(x=>of(x)),
            switchMap(country => {
              return of<DetailsMovieBody>({
                title: baseMovie.Title,
                actors: baseMovie.Actors,
                director: baseMovie.Director,
                imdbRating: baseMovie.imdbRating,
                plot: baseMovie.Plot,
                poster: baseMovie.Poster,
                runTime: baseMovie.Runtime,
                imdbID: baseMovie.imdbID,
                country: baseMovie.Country,
                countrys: country,
                review: result.review,
                rating: result.rating,
                status: result.status,
                time: result.time,
              })
            })
          )
        }
        )))).subscribe(movie => {
          movieDetails.movie = movie;
          this.loadingServie.end();
        }
        );
}

}
