import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogginPageComponent } from './Components/loggin-page/loggin-page.component';
import { RegistroDeUserPageComponent } from './Components/registro-de-user-page/registro-de-user-page.component';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http'; 
import { User } from './Services/services/user';
import { NavvarComponent } from './Components/navvar/navvar.component';
import { DetallesGralComponent } from './Components/detalles-gral/detalles-gral.component';
import { RegistroTareasComponent } from './Components/registro-tareas/registro-tareas.component';
import { TareasRegistradasComponent } from './Components/tareas-registradas/tareas-registradas.component';
import { TareasPendientesComponent } from './Components/tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './Components/tareas-completadas/tareas-completadas.component';
import { InfoUserComponent } from './Components/info-user/info-user.component';
import { ActualizarCuentaComponent } from './Modals/actualizar-cuenta/actualizar-cuenta.component';
import { TaskService } from './Services/services/task';
import { FooterComponent } from './Components/footer/footer.component';
import { ActualizarTaskComponent } from './Modals/actualizar-task/actualizar-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    LogginPageComponent,
    RegistroDeUserPageComponent,
    NavvarComponent,
    DetallesGralComponent,
    RegistroTareasComponent,
    TareasRegistradasComponent,
    TareasPendientesComponent,
    TareasCompletadasComponent,
    InfoUserComponent,
    ActualizarCuentaComponent,
    FooterComponent,
    ActualizarTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  entryComponents: [ActualizarCuentaComponent],
  providers: [User, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
