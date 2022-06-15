import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { NotFoundComponent } from './notFound.component';


export const routes:Route[]=[
    {
        path: '',
        component: NotFoundComponent
    },
];

@NgModule({
    imports: [RouterModule. forChild(routes)],
    exports: [RouterModule],
})
export class NotFoundRoutingModule {}