import { CatalogueFacadeService } from './services/catalogue-facade.service';
import { ListMovieBody, WatchStatus } from './catalogue.model';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie-api.service';
import { Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CatalogueFnService } from './services/catalogue-fn.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  constructor(
    public movieService: MovieApiService,
    private router: Router,
    public catalogueFnService:CatalogueFnService,
    public catalogueFacade:CatalogueFacadeService
  ) { }

  moviesArray: ListMovieBody[]=[];

  status=WatchStatus;

  currentTime=new Date();

  isDelete:boolean;

  endSubj_: Subject<number> = new Subject();

  ngOnInit() {
    this.catalogueFacade.getMovieFromBase(this);
    document.body.style.backgroundColor="black";
  }

  ngOnDestroy(){
   this.endSubj_.next(-1);
   this.endSubj_.unsubscribe();
  }

  goToDetails(movieId:string){
    this.router.navigate([`catalogue/${movieId}`]);
  }
}