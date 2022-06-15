import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.style.background= "url('../assets/images/404_error_the-shining-wallpaper-data-src-the-shining-wallpapers.jpg')";
    document.body.style.backgroundSize='cover';
    document.body.style.backgroundRepeat='no-repeat';
     document.body.style.backgroundAttachment='fixed';
    
  }

}
