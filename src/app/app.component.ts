import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proj_2';

  public loading: Subject<boolean> = new Subject();

  constructor(
    private loadingService: LoadingService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private translate:TranslateService
    ) { }

  ngOnInit() {
    console.log('ffgfgf');
    this.loading = this.loadingService.loading$();
    this.auth.user?.pipe(
      tap(x => {
        this.authService.setUserId(x?.uid);
      }),
    ).subscribe();

    this.translate.use("en");
  }
}