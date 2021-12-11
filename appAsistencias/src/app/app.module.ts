import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CrearRegistroComponent } from './crear-registro/crear-registro.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditarAsistenteComponent } from './editar-asistente/editar-asistente.component';

const appRoute:Routes = [
  {path:'', component:HomeComponent},
  {path:'crear-registro', component:CrearRegistroComponent},
  {path:'editar-asistente/:id', component:EditarAsistenteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CrearRegistroComponent,
    EditarAsistenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'El campo es requerido',
          minlength: ({ requiredLength, actualLength }) => 
                      `Se espera ${requiredLength}, pero digito ${actualLength}`,
          invalidAddress: error => `Correo Invalido`
        }
      }
    }),
    MatCardModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
