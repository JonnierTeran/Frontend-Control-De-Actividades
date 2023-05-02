//Modulos del router
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes del router
import { LogginPageComponent } from './Components/loggin-page/loggin-page.component';
import { RegistroDeUserPageComponent } from './Components/registro-de-user-page/registro-de-user-page.component';
import { NavvarComponent } from './Components/navvar/navvar.component';
import { DetallesGralComponent } from './Components/detalles-gral/detalles-gral.component';
import { RegistroTareasComponent } from './Components/registro-tareas/registro-tareas.component';
import { TareasRegistradasComponent } from './Components/tareas-registradas/tareas-registradas.component';
import { TareasPendientesComponent } from './Components/tareas-pendientes/tareas-pendientes.component';
import { TareasCompletadasComponent } from './Components/tareas-completadas/tareas-completadas.component';
import { InfoUserComponent } from './Components/info-user/info-user.component';


//Configuracion de rutas
const routes: Routes = [
  {path: "", component:LogginPageComponent},
  {path: "Loggin", component:LogginPageComponent},
  {path: "RegistrarUser", component:RegistroDeUserPageComponent},
  {path: "PageInitial", component:NavvarComponent, children:[ //Rutas Hijas
    {path:"" , component: DetallesGralComponent},
    {path:"Detalles" , component: DetallesGralComponent},
    {path:"Registros" , component: RegistroTareasComponent},
    {path:"Viewtask" , component: TareasRegistradasComponent},
    {path:"taskpendientes", component: TareasPendientesComponent },
    {path: "taskCompletadas", component: TareasCompletadasComponent},
    {path: "Infouser" , component: InfoUserComponent}
  ]}
];

//Declaracion del router
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//Logica del router
export class AppRoutingModule { }
