import { HttpClient } from '@angular/common/http';
import { MovieApiService } from './movie-api.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingService } from './../../services/loading.service';
import { AddMovieBody, ListMovieBody, MovieResult } from './../catalogue.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/compat/firestore'
import { filter, finalize, map, Observable, tap, switchMap, from, of } from 'rxjs';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { Sweetalert2Service } from 'src/app/services/sweetalert2.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {

  constructor(
    private firestore: AngularFirestore,
    private loadingService: LoadingService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private http: HttpClient,
    private sweetalert:Sweetalert2Service
    ) { }

  addMovie(movie: AddMovieBody) {
    this.loadingService.start();
    from(this.firestore.collection('catalogue').add(movie)).pipe(
      finalize(() => {
        this.loadingService.end();
        this.sweetalert.successAlert();
      })
    ).subscribe();
  }

  getMovieByImdbId(imdbId: string) {
    // this.firestore.collection('catalogue').addItem();
    return this.http.get<MovieResult>(`http://www.omdbapi.com/?apikey=540d1872&i=${imdbId}`);
  }

}
