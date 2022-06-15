import { MovieDetailsFacadeService } from './movie-details-facade.service';
import { LoadingService } from './../../../services/loading.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { WatchStatus } from '../../catalogue.model';
import { MovieDetailsComponent } from '../movie-details.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsFnService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router,
    private movieDetailsFacadeService:MovieDetailsFacadeService
  ) { }


  // Function editReview:
  async editReview(movieDetails: MovieDetailsComponent) {
    let { value: result } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'movie review',
      inputValue: movieDetails.movie.review,
      inputPlaceholder: 'Type your new review here...',
      inputAttributes: {
        'aria-label': 'Type your new review here'
      },
      showCancelButton: true,
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      cancelButtonText: 'clear',
    });

    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService?.userId)).doc(movieDetails.movieId).update({
      review: result
    });
    this.movieDetailsFacadeService.getMovieForDetails(movieDetails);
  }

 // Function editRating:
  async editRating(movieDetails: MovieDetailsComponent) {
    let { value: result } = await Swal.fire({
      title: 'select new rating',
      input: 'select',
      inputOptions: {
        1: '1 star',
        2: '2 star',
        3: '3 star',
        4: '4 star',
        5: '5 star'
      },
      inputPlaceholder: 'select new rating...',
      showCancelButton: true,
      cancelButtonText: 'clear'
    });
    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService?.userId)).doc(movieDetails.movieId).update({
      rating: result
    });
    this.fillStar(result);
    this.movieDetailsFacadeService.getMovieForDetails(movieDetails);
  }

 // Function fillStar:
  fillStar(rating: number) {
    for (let i = 1; i <= 5; i++) {
      document.getElementById('div' + i).style.fill = "grey";
    }

    for (let i = 1; i <= rating; i++) {
      document.getElementById('div' + i).style.fill = "gold";
    }
  }


   // Function editStatus:
  async editStatus(movieDetails: MovieDetailsComponent) {
    let status: WatchStatus;
    if (movieDetails.movie.status == WatchStatus.Watched) {
      status = WatchStatus.NotWatched;
    } else {
      status = WatchStatus.Watched;
    }

    let { value: result } = await Swal.fire({
      title: 'select new status',
      input: 'select',
      inputOptions: {
        status: status,
      },
      inputPlaceholder: 'select new rating...',
      showCancelButton: true,
      cancelButtonText: 'clear'
    });

    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService?.userId)).doc(movieDetails.movieId).update({
      status: status
    });
    this.movieDetailsFacadeService.getMovieForDetails(movieDetails);
  }

 // Function checkMovieId:
  checkMovieId(movieDetails: MovieDetailsComponent) {
    this.firestore.collection('catalogue', (ref) => ref.where('uid', '==', this.authService.userId)).doc(movieDetails.movieId).get().subscribe(x => {
      if (!x.data()) {
        this.loadingService.end();
        this.router.navigate(['/404-not-found']);
        return;
      }
    })
  }


}
