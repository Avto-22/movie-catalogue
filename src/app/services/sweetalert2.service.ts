import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AddMovieComponent } from '../catalogue/add-movie/add-movie.component';
import { WatchStatus } from '../catalogue/catalogue.model';


@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor(

  ) { }

  formErrorMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
    })
  }

  async textArea(form: FormGroup) {
    let { value: result } = await Swal.fire({
      input: 'textarea',
      inputValue: form.get('review').value,
      inputLabel: 'movie review',
      inputPlaceholder: 'Type your review here...',
      inputAttributes: {
        'aria-label': 'Type your review here'
      },
      showCancelButton: true,
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      cancelButtonText: 'clear'
    });
    form.get('review').setValue(result);
  }

  async selectStatus(form: FormGroup) {
    let { value: status } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        prop1: WatchStatus.Watched,
        prop2: WatchStatus.NotWatched,
      },
      inputPlaceholder: form.get('status').value != null ? form.get('status').value : 'select status...',
      showCancelButton: true,

    })
    if (status == 'prop1') {
      status = WatchStatus.Watched;
    }
    if (status == 'prop2') {
      status = WatchStatus.NotWatched;
    }
    if (status) {
      form.get('status').setValue(status);
    }
  }


  successAlert() {
    Swal.fire({
      title: 'Movie was added successfully',
      toast: true,
      icon: 'success',
      allowEscapeKey: false,
      showConfirmButton: false,
      showCancelButton: false,
      timer: 2000,
      background: 'rgba(0, 77, 167)',
      color: 'white'
    });
  }

  statusErrorAlert() {
    Swal.fire({
      title: 'status is required',
      toast: true,
      icon: 'warning',
      allowEscapeKey: false,
      showConfirmButton: false,
      position: 'top-right',
      background:'black',
      color:'white'
    });
  }

  reviewErrorAlert() {
    Swal.fire({
      text: 'review is required',
      toast: true,
      icon: 'warning',
      allowEscapeKey: false,
      showConfirmButton: false,
      position: 'top-right',
      background:'black',
      color:'white',
    });
  }

  ratingErrorAlert() {
    Swal.fire({
      text: 'rating is required',
      toast: true,
      icon: 'warning',
      allowEscapeKey: false,
      showConfirmButton: false,
      position: 'top-right',
      background:'black',
      color:'white'
    });
  }

  checkFormError(obj:AddMovieComponent){
    if(obj.form.get('review').errors){
      this.reviewErrorAlert();
    }
    if(obj.form.get('rating').errors){
      this.ratingErrorAlert();
    }
    if(obj.form.get('status').errors){
      this.statusErrorAlert();
    }
  }
}
