import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { LoadingService } from './../../services/loading.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { AppComponent } from 'src/app/app.component';
import { tap } from 'rxjs';


interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(private auth: AngularFireAuth, private router: Router, private loadingService: LoadingService, private app: AppComponent, private authService: AuthService) { }


  signIn({ email, password }: User) {
      this.authService.signIn({ email, password });
  }

  goToSignUp(): void {
    this.router.navigate(['sign-up']);
  }

  ngOnInit() {

  }

}