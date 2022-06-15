import { Sweetalert2Service } from './../../../services/sweetalert2.service';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { WatchStatus } from '../../catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class AddMovieFnService {

  constructor() { }

  checkRating(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value > 0) {
        return null;
      }
      return {
        error: 'ფილმის რეიტინგი არაა მითითებული'
      }
    }
  }

  checkStatus(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value != WatchStatus.Select) {
        return null;
      }
      return {
        error: 'სტატუსი არაა არჩეული'
      }
    }
  }

  checkForm(form: FormGroup, sweetalert: Sweetalert2Service) {
    let error: boolean = false;

    let controlsArr = [
      form.get('review'),
      form.get('rating'),
      form.get('status')
    ];
    controlsArr.forEach(control => {
      if (control.errors) {
        sweetalert.formErrorMessage();
        error = true;
      }
    });
    return error;
  }


  overStar(star: number) {
    for (let i = 1; i <= star; i++) {
      document.getElementById('div' + i).style.fill = "gold";
    }
    for (let i = star + 1; i <= 5; i++) {
      document.getElementById('div' + i).style.fill = "grey";
    }
  }

  outStar(star: number, actuelStar:number) {
    for (let i = 1; i <= star; i++) {
      document.getElementById('div' + i).style.fill = "grey";
    }
    if (actuelStar > 0) {
      for (let i = 1; i <= actuelStar; i++) {
        document.getElementById('div' + i).style.fill = "gold";
      }
    }
  }


}
