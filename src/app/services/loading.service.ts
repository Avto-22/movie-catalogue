import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading: Subject<boolean> = new Subject<boolean>();

   loading$(): Subject<boolean>{
    return this._loading;
  }

  start() { 
    this._loading.next(true);  
  }
  end() {
    this._loading.next(false);
  }

}
