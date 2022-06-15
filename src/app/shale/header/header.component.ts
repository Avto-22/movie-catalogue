import { AuthService } from './../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService, private auth: AngularFireAuth, private router:Router, private authService:AuthService) { }

  userEmail:string;

  ka() {
    this.translate.use('ka');
  }
  
  en() {
    this.translate.use('en');
  }

  changeLang(){
    if(this.translate.currentLang=='en'){
      this.ka();
    }
    else{
      this.en();
    }
  }

  goToCatalogue():void{
    this.router.navigate(['catalogue']);
  }

  goToAddComponent():void{
    this.router.navigate(['catalogue/add']);
  }
  
  signOut(){
    this.auth.signOut().then(()=>{this.router.navigate(['sign-in'])});
  }

  ngOnInit() {
    this.auth.user.pipe(tap(user=>this.userEmail=user?.email)).subscribe(); 
  }
}
