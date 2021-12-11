import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { asistentes } from './asistentes';

@Injectable({
  providedIn: 'root'
})
export class ServicioApiService {
  api: string = "http://localhost/asistentes/";
  constructor(private http: HttpClient) { }

  // servicio para agregar un asistente
  agregarAsistente(newAsistente: asistentes) : Observable<any>{
    return this.http.post(
      `${this.api}`,
      newAsistente
    )
  }

  // Servicio para consultar todos los asistente
  consultarTodo(): Observable<any>{
    return this.http.get(`${this.api}`)
  }
  
  // servicio para solo consultar por un asistente
  consultarID(id:any): Observable<any>{
    return this.http.get(`${this.api}`, {params: {'id': id, 'tipo': '1'}})
  }

  // Servicio para eliminar un asistente seleccionado
  eliminarRegistro(id: any): Observable<any>{

    return this.http.delete(
      `${this.api}`, {'body':id}
    )
  }

  // Servicio para cambiar el estado de un asistente
  cambiarEstado(id: any, estado:any): Observable<any>{
    return this.http.put(
      `${this.api}`, {'id':id, 'estado':estado, 'tipo':'1'}
    )
  }

  // Servicio para editar un asistente seleccionado
  editarAsistente(id: any, updAsistente: asistentes): Observable<any>{
    return this.http.put(
      `${this.api}`, {'id': id, 'datos': updAsistente, 'tipo':'2'}
    )
  }
}
