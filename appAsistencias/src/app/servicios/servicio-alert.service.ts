import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

// Clase utiliza para dar respuesta correcta o error con sweetalert
export class ServicioAlertService {

  constructor() { }

  
  public success(msj:string){
    Swal.fire(
    {
      title: 'Información',
      html: `<b>${msj}</b>`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }
    );
  }

  public error(msj:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: msj
    });
  }
}
