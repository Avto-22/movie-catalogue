import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './../shale/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue.component';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { LoadingService } from '../services/loading.service';
import { SharedModule } from '../shared/shared.module';
import { MovieApiService, MOVIE_BASE_URL } from './services/movie-api.service';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';


@NgModule({
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [CatalogueComponent, HeaderComponent, AddMovieComponent, MovieDetailsComponent],
  providers: [
    LoadingService,
    MovieApiService,
    {
      provide: MOVIE_BASE_URL,
      useValue: environment.movieApiBase
    },
  ]

})
export class CatalogueModule { 
  
}
