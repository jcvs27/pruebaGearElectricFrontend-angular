import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ServicioAlertService } from '../servicios/servicio-alert.service';
import { ServicioApiService } from '../servicios/servicio-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Se asigna los nombre de la columnas de la tabla
  displayedColumns: string[] = ['identificacion','Tipo_Documento', 'Nombres', 'Apellidos', 'Telefono', 'Correo', 'Estado','Acciones'];
  dataSource= new MatTableDataSource(); // Se instancia un objeto para guardar los datos de la consulta de los asistentes

  // Se obtine una variables de formulario para paginación y filtro de búsqueda
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ServicioApiService,
    private alert: ServicioAlertService
    ) { }

  ngOnInit(): void {
    // Se consulta los datos de los asistente una vez que cargue la pagina
    this.service.consultarTodo().subscribe(resultado =>{
      if(resultado.datos != null){
        this.dataSource.data = resultado.datos;
      }else{
        this.dataSource.data = [];
      }
      
    })
  }

  // Se construye la paginación y el filtro de búsqueda
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Función para los filtros por cualquier campo
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // función para eliminar un registro
  delete(id:any){
    Swal.fire({
      title: 'Esta Seguro!',
      text: "¿Desea eliminar este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.service.eliminarRegistro(id).subscribe(
            (res)=>{
              if(res.status == '200'){
                this.alert.success(res.msj);
                this.actualizar();
              }else{
                this.alert.error(res.msj);
              }
            }
          );
      }
    })
  }

  // función para cambiar el estado de un asistente
  cambiarEstado(id: any, estado: any){
    Swal.fire({
      title: 'Esta Seguro!',
      text: "¿Desea cambiar el estado de este registro?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.service.cambiarEstado(id, estado).subscribe(
            (res)=>{
              if(res.status == '200'){
                this.alert.success(res.msj);
                this.actualizar();
              }else{
                this.alert.error(res.msj);
              }
            }
          );
      }
    })

  }

  // Función para recarga la tabla de consulta
  actualizar(){
    this.service.consultarTodo().subscribe(resultado =>{
      if(resultado.datos != null){
        this.dataSource.data = resultado.datos;
      }else{
        this.dataSource.data = [];
      }
      
    })
  }

}
