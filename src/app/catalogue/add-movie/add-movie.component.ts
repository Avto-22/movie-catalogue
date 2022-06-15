import { TranslateService } from '@ngx-translate/core';
import { AddMovieFacadeService } from './services/add-movie-facade.service';
import { AddMovieFnService } from './services/add-movie-fn.service';
import { Sweetalert2Service } from './../../services/sweetalert2.service';
import { AuthService } from './../../services/auth.service';
import { FireStoreService } from './../services/fire-store.service';
import { WatchStatus, Movie, CountryResult, AddMovieBody } from './../catalogue.model';
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit, OnDestroy {

  get getMovieStatus() {
    return this.movieStatus == WatchStatus.NotWatched;
  }
  
  constructor(
    public movieService: MovieApiService,
    public fireStoreService: FireStoreService,
    private auth: AuthService,
    private ngZone: NgZone,
    public sweetalert:Sweetalert2Service,
    public addMovieFnService:AddMovieFnService,
    public addMovieFacadeService:AddMovieFacadeService,
    private translate:TranslateService

  ) { }

  movieName: string = '';

  form: FormGroup;

  endObservable: Subject<any> = new Subject();

  movieStatus: WatchStatus;

  movie: Movie;

  storeMovie: AddMovieBody;

  userId: string;

  lastSearch: string[] = [];

  isSearched: boolean = false;

  isError: boolean = false;

  actuelStar: number = 0;

  searchPlaceholder:string;


  private createForm(): void {
    this.form = new FormGroup({
      review: new FormControl('', [Validators.required, Validators.minLength(10)]),
      rating: new FormControl(0, [this.addMovieFnService.checkRating()]),
      status: new FormControl(WatchStatus.Select, [Validators.required])
    });
  }

  ngOnInit() {
    this.translate.get('ADD-MOVIE.SEARCH-PLACEHOLDER').pipe(
      takeUntil(this.endObservable)
    ).subscribe(x=>this.searchPlaceholder=x);

    this.createForm();

    this.userId = this.auth.userId;
    if (JSON.parse(localStorage.getItem(this.userId))) {
      this.lastSearch = JSON.parse(localStorage.getItem(this.userId));
    }
    
    document.body.style.backgroundColor = "#161616";

    this.form.get('status').valueChanges.pipe(
      takeUntil(this.endObservable),
      tap(status => this.movieStatus = status))
      .subscribe();

      this.ngZone.run(()=>{
        //back
      })
  }

  ngOnDestroy() {
    this.endObservable.next('end component');
    this.endObservable.unsubscribe();
  }

  addMovie(movie) {
    this.movieName = movie;
    this.addMovieFacadeService.getMovie(this);
    this.reset();
  }

  clickStar(star: number) {
    this.actuelStar = star;
  }

  reset() {
    this.actuelStar = 0;
    if (this.isSearched) {
      this.addMovieFnService.outStar(5,this.actuelStar);
    }
    this.movieName = "";
    this.form.reset();
  }

  getPopulation(country: CountryResult) {
    return 'population: ' + country.population;
  }

}
