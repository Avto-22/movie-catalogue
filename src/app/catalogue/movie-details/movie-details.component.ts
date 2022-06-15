import { MovieDetailsFacadeService } from './services/movie-details-facade.service';
import { MovieDetailsFnService } from './services/movie-details-fn.service';
import { WatchStatus } from './../catalogue.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { DetailsMovieBody } from '../catalogue.model';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    public movieApiService: MovieApiService,
    public movieDetailsFnService:MovieDetailsFnService,
    private movieDetailsFacadeService:MovieDetailsFacadeService
  ) { }

  movie: DetailsMovieBody;

  movieId: string = this.activatedRoute.snapshot.params['id'];

  status=WatchStatus;

  endSubj_: Subject<number> = new Subject();

  ngOnInit() {
    this.movieDetailsFacadeService.getMovieForDetails(this);
    document.body.style.backgroundColor="black";
  }

  ngOnDestroy() {
    this.endSubj_.next(-1);
    this.endSubj_.complete();
  }

  getPopulationWitchCountry(population:number){
    return `population: ${population}`;
  }

 

}
