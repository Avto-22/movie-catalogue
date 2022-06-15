import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShaleComponent } from './shale.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
  ],
  declarations: [ShaleComponent, HeaderComponent]
})
export class ShaleModule { }
