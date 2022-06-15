import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['catalogue']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);

export const routes: Route[] = [
    {
        path: '',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems },
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
    },

    {
        path: 'catalogue',
        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
        loadChildren: ()=> import('./catalogue/catalogue.module').then((m)=>m.CatalogueModule)
    },

    {
        path: '**',
        loadChildren: ()=> import('./notFound/notFound.module').then((m)=>m.NotFoundModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }