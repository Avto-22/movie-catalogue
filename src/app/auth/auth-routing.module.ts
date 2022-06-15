import { NgModule } from '@angular/core';
import { Route, RouterModule } from "@angular/router";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes:Route[]=[
    {
        path: '',
        component: SignInComponent
    },
    {
        path: 'sign-in',
        pathMatch:'prefix',
        component: SignInComponent
    },
    
    {
        path: 'sign-up',
        component: SignUpComponent
    }

];

@NgModule({
    imports: [RouterModule. forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}