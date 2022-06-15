import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { tap } from 'rxjs/operators';

interface User{
  email:string;
  password:string;
  repeat:string;
  userName:string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( private auth: AngularFireAuth, private router:Router, private loadingService: LoadingService, private authService:AuthService) {  }

  signUp({email, password, repeat}: User){
    this.authService.signUp({email, password, repeat});
  }

  goToSignIn(){
    this.router.navigate(['sign-in']);
  }

  ngOnInit() {
  }

}
