import { Subscription, tap } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AppComponent } from '../app.component';
import { LoadingService } from './loading.service';
import Swal from 'sweetalert2';

export interface User {
  email: string;
  password?: string;
  repeat?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  public myUser: User;
  private app: AppComponent;

  userId: string;
  setUserId(id: string) {
    this.userId = id;
  }

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private loadingService: LoadingService
  ) { }

  getUserId(id: string): void {
    this.auth.user.subscribe(user => id = user.uid);
  }

  signUp({ email, password, repeat }: User) {
    if ((!email || !password || !repeat) || (password != repeat)) {
      return;
    }

    this.loadingService.start();
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.loadingService.end();
      this.router.navigate(['catalogue']);
    },
      (error) => {
        throw 'sign in error. invalid user';
      },
    ).catch((error) => {
      Swal.fire({
        title: 'მონაცემები არასწორია',
        text: error,
        toast: true,
        position: 'top',
        icon: 'error',
        allowEscapeKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        background: 'black',
        color: 'white'
      });
      throw 'invalid user';
    })
      .finally(() => {
        this.loadingService.end();
      });
  }

  signIn({ email, password }: User) {
    if (!email || !password) {
      return;
    }

    this.loadingService.start();
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['catalogue']);
    },
      (error) => {
        throw 'sign in error. Email or passwor is incorect.';
      },
    ).catch((error) => {
      Swal.fire({
        title: 'მონაცემები არასწორია',
        text: error,
        toast: true,
        position: 'top',
        icon: 'error',
        allowEscapeKey: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: 3000,
        background: 'black',
        color: 'white'
      });
      throw 'invalid user';
    })
      .finally(() => {
        this.loadingService.end();
      })


  }

  signOut() {
    this.auth.signOut().then(() => { this.router.navigate(['sign-in']) });
  }

  ngOnInit() {

  }

}
