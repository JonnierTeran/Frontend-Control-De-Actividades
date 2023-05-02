//Modulos de la aplicacion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Componentes de la aplicacion
import { AppComponent } from './app.component';
import { LogginPageComponent } from './Components/loggin-page/loggin-page.component';
import { RegistroDeUserPageComponent } from './Components/registro-de-user-page/registro-de-user-page.component';
import { NavvarComponent } from './Components/navvar/navvar.component';
import { DetallesGralComponent } from './Components/detalles-gral/detalles-gral.component';
import { RegistroTareasComponent } from './Components/registro-tareas/registro-tareas.component';
import { TareasRegistradasComponent } from './Components/tareas-registradas/tareas-registradas.component';
import { TareasPendientesComponent } from './Components/tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './Components/tareas-completadas/tareas-completadas.component';
import { InfoUserComponent } from './Components/info-user/info-user.component';
import { FooterComponent } from './Components/footer/footer.component';

//EntryComponents Modals
import { ActualizarCuentaComponent } from './Modals/actualizar-cuenta/actualizar-cuenta.component';
import { ActualizarTaskComponent } from './Modals/actualizar-task/actualizar-task.component';
import { ActualizarPasswordComponent } from './Modals/actualizar-password/actualizar-password.component';

//Servicios de la app
import { TaskService } from './Services/services/task';
import { User } from './Services/services/user';


//Declaracion del modulo
@NgModule({
  //Declaracion de Componentes
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
    ActualizarTaskComponent,
    ActualizarPasswordComponent
  ],
  //Declaracion de modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  //Declaracion de Componentes modals
  entryComponents: [ActualizarCuentaComponent,
                     ActualizarTaskComponent,
                     ActualizarPasswordComponent
  ],
  //Declaracion de servicios
  providers: [User, TaskService],
  //Declaracion del componente principal
  bootstrap: [AppComponent]
})
export class AppModule { 
}
