import { ListMovieBody } from './../catalogue.model';
import { CatalogueComponent } from './../catalogue.component';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, map, of, switchMap, tap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { AddMovieBody } from '../catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueFacadeService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  getMovieFromBase(catalogue: CatalogueComponent) {
    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService?.userId)).get().pipe(takeUntil(catalogue.endSubj_)).subscribe(result => {
      result?.docs?.forEach(movie => {
        this.loadingService.start();
        this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService.userId)).doc(movie.id).get().pipe(
          map<any, AddMovieBody>(result => result.data()),
        )
          .pipe(
            switchMap(result => catalogue.movieService.getMovieByImdbId(result.imdbID).pipe(
              switchMap(baseMovie => {
                return of<ListMovieBody>(
                  {
                    plot: baseMovie.Plot,
                    poster: baseMovie.Poster,
                    title: baseMovie.Title,
                    director: baseMovie.Director,
                    time: result.time,
                    movieId: movie.id,
                    imdbRating: baseMovie.imdbRating,
                    status: result.status
                  }
                );
              })
            )),
            tap(movieValue => {
              catalogue.moviesArray = [movieValue, ...catalogue.moviesArray].sort(
                (obj1: ListMovieBody, obj2: ListMovieBody) => {
                  return Date.parse(obj1.time) > Date.parse(obj2.time) ? -1 : 0;
                });
              this.loadingService.end();
            })
          ).subscribe();
      });
    });
  }

  deleteData(movieId: string, index: number, cataloge: CatalogueComponent) {
    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService?.userId)).doc(movieId).delete();
    cataloge.moviesArray.splice(index, 1);
  }

}
