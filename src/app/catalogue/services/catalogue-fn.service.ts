import { CatalogueComponent } from './../catalogue.component';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class CatalogueFnService {

  constructor() { }


  questionAlert(movieId: string, index: number, catalogue: CatalogueComponent) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: 'rgb(0,0,0)',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: 'Your file has been deleted.',
          showConfirmButton: false,
          showCancelButton: false,
          timer: 2000,
          icon: 'success',
          background: 'rgb(0,0,0)',
          color: 'white'
        }
        );
        catalogue.catalogueFacade.deleteData(movieId, index,catalogue);
      }
    })
  }

}
