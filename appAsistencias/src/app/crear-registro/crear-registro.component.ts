import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAlertService } from '../servicios/servicio-alert.service';
import { ServicioApiService } from '../servicios/servicio-api.service';

@Component({
  selector: 'app-crear-registro',
  templateUrl: './crear-registro.component.html',
  styleUrls: ['./crear-registro.component.css']
})
export class CrearRegistroComponent implements OnInit {
  //Se crea el grupo 
  formAsistentes: FormGroup;

  constructor(
    public formulario: FormBuilder,
    private servicio: ServicioApiService,
    private alert: ServicioAlertService,
    private router: Router) {
    //Se establece el grupo con los campos del formularios
    this.formAsistentes = formulario.group(
      {
        inputIden: ['', [Validators.required, Validators.maxLength(30)]],
        SelecTipo: ['', Validators.required],
        inputNombres: ['', [Validators.required, Validators.maxLength(100)]],
        inputApellidos: ['', [Validators.required, Validators.maxLength(100)]],
        inputTelefono: ['', [Validators.required, Validators.maxLength(10)]],
        inputCorreo: ['', [Validators.required, Validators.email]]
      }
    )
  }

  ngOnInit(): void {
  }

  // Se captura los datos del formulario y se envia al servicio agregarAsistente
  guardarDatos() {
    if (this.formAsistentes.valid) {
      this.servicio.agregarAsistente(this.formAsistentes.value).subscribe(
        (res) => {
          if (res.status === '200') {
            this.alert.success(res.msj);
            this.router.navigateByUrl('');
          } else {
            this.alert.error(res.msj);
          }
        }
      )
    }
  }

  // función para solo permitir números en los campos que se requiere
  public restrictNumeric(e: { metaKey: any; ctrlKey: any; which: number; }) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }
}
