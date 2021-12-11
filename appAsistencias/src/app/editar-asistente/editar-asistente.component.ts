import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioApiService } from '../servicios/servicio-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioAlertService } from '../servicios/servicio-alert.service';

@Component({
  selector: 'app-editar-asistente',
  templateUrl: './editar-asistente.component.html',
  styleUrls: ['./editar-asistente.component.css']
})
export class EditarAsistenteComponent implements OnInit {
  // Inicialización de alguna variables
  id: any;
  formAsistentes: FormGroup;
  readonly = false;
  constructor(private activeRoute: ActivatedRoute,
    private servicio: ServicioApiService,
    public formulario: FormBuilder,
    private alert: ServicioAlertService,
    private router: Router) {
    // Se valida el grupo de campos del formulario
    this.formAsistentes = formulario.group(
      {
        inputIden: [''],
        SelecTipo: ['', Validators.required],
        inputNombres: ['', [Validators.required, Validators.maxLength(100)]],
        inputApellidos: ['', [Validators.required, Validators.maxLength(100)]],
        inputTelefono: ['', [Validators.required, Validators.maxLength(10)]],
        inputCorreo: ['', [Validators.required, Validators.email]]
      }
    );
    this.readonly = true; // Desactivar campo de la cedula
    // se obtiene el id del asistente de la url
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    // Se llama al servicio que hace la consulta por id del asistente
    this.servicio.consultarID(this.id).subscribe(
      (res) => {
        // Se llenan los campos con la información de ese asistente
        this.formAsistentes.setValue(
          {
            inputIden: res.datos[0]['numerodocumento'],
            SelecTipo: res.datos[0]['tipodocumento'],
            inputNombres: res.datos[0]['nombres'],
            inputApellidos: res.datos[0]['apellidos'],
            inputTelefono: res.datos[0]['telefonomovil'],
            inputCorreo: res.datos[0]['correo']
          }
        )

      }
    )

  }

  ngOnInit(): void {

  }

  // Se captura los datos editados para enviarlos al servicio http
  guardarDatos() {
    if (this.formAsistentes.valid) {
      console.log(this.id, this.formAsistentes.value)
      this.servicio.editarAsistente(this.id, this.formAsistentes.value).subscribe(
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
