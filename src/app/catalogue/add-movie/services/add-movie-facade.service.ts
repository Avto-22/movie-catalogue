import { LoadingService } from './../../../services/loading.service';
import { AddMovieComponent } from './../add-movie.component';
import { Sweetalert2Service } from './../../../services/sweetalert2.service';
import { AddMovieFnService } from './add-movie-fn.service';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
import { Movie } from '../../catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class AddMovieFacadeService {

  constructor(
    private addMovieFnService: AddMovieFnService,
    private sweetalert: Sweetalert2Service,
    private loadingService:LoadingService,
  ) { }


  addStoreMovie(addMovie: AddMovieComponent) {
    if (this.addMovieFnService.checkForm(addMovie.form, this.sweetalert)) {
      return;
    }
    addMovie.storeMovie = {
      review: addMovie.form.get('review').value,
      rating: addMovie.form.get('rating').value,
      status: addMovie.form.get('status').value,
      uid: addMovie.userId,
      imdbID: addMovie.movie.imdbID,
      time: String(new Date())
    }
    addMovie.reset();
    addMovie.isSearched = false;
    addMovie.fireStoreService.addMovie(addMovie.storeMovie);
  }

  getMovie(addMovie: AddMovieComponent) {
    if (addMovie.movieName == '') {
      return;
    }
    this.loadingService.start();
    addMovie.movieService.getMovieByName(addMovie.movieName).pipe(
      takeUntil(addMovie.endObservable),
      switchMap(film => {
        let country = film.Country.split(", ");
        return forkJoin(country.map(result => addMovie.movieService.getCountry(result)
          .pipe(
            map(countrys => {
              return {
                population: countrys.population,
                flags: countrys.flags
              }
            }),
            catchError((error) => {
              return of({
                population: null,
                flags: null,
              });
            })
          )))
          .pipe(
            catchError(x => of(x)),
            switchMap((country) => {
              return of<Movie>({
                title: film.Title,
                actors: film.Actors,
                director: film.Director,
                imdbRating: film.imdbRating,
                plot: film.Plot,
                poster: film.Poster,
                runTime: film.Runtime,
                imdbID: film.imdbID,
                country: film.Country,
                countrys: country
              })
            })
          );
      }),
    ).subscribe((x) => {
      addMovie.movie = x;
      addMovie.form.reset();
      addMovie.isSearched = true;
      addMovie.isError = false;
      this.loadingService.end();
    },
      (x) => {
        addMovie.movieName = "";
        addMovie.isSearched = false;
        addMovie.isError = true;
        this.loadingService.end();
      });
  }

  search(addMovie: AddMovieComponent) {
    if (addMovie.movieName == '') {
      return;
    }

    this.getMovie(addMovie);
    addMovie.lastSearch = JSON.parse(localStorage.getItem(addMovie.userId));

    if (!addMovie.lastSearch) {
      localStorage.setItem(addMovie.userId, JSON.stringify([addMovie.movieName]));
      addMovie.lastSearch = JSON.parse(localStorage.getItem(addMovie.userId));
    }
    if (addMovie.lastSearch.length == 3 && !addMovie.lastSearch.find(x => addMovie.movieName == x)) {
      addMovie.lastSearch.splice(2, 1);
    }
    if (addMovie.lastSearch.find(x => addMovie.movieName == x)) {
      addMovie.reset();
      return;
    }
    addMovie.lastSearch = [addMovie.movieName, ...addMovie.lastSearch];
    localStorage.setItem(addMovie.userId, JSON.stringify(addMovie.lastSearch));
    addMovie.reset();
  }

}
