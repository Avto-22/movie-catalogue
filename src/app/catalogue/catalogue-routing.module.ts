import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CatalogueComponent } from './catalogue.component';

export const routes:Route[]=[
    {
        path: '',
        component: CatalogueComponent
    },
    {
        path: 'add',
        component: AddMovieComponent
    },
    {
        path: ':id',
        component: MovieDetailsComponent
    },
    {
        path: '**',
        loadChildren: ()=> import('../notFound/notFound.module').then((m)=>m.NotFoundModule)
    }
  
];

@NgModule({
    imports: [RouterModule. forChild(routes)],
    exports: [RouterModule],
})
export class CatalogueRoutingModule {}