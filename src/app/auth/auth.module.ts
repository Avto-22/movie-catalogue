import { LoadingService } from './../services/loading.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    FormsModule
  ],
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  providers:[LoadingService]
})
export class AuthModule { }
