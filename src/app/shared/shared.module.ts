import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from '../services/loading.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SharedComponent, LoadingComponent],
  exports:[LoadingComponent],
  providers:[LoadingService]
})
export class SharedModule { }
