//Modulos del componente
import { Component, OnInit } from '@angular/core';

//Servicios del componente
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/services/task';

//Definicion del componente
@Component({
  selector: 'app-detalles-gral',
  templateUrl: './detalles-gral.component.html',
  styleUrls: ['./detalles-gral.component.css']
})
//Logica del componente
export class DetallesGralComponent implements OnInit {

  //Atribuos del componente
  UserName: string;
  Registros!: number;
  Pendientes!: number;
  Completadas!: number;

  //Inicializacion de atributos e Injeccion de Servicios
  public constructor(private _TaskService: TaskService, private _Router: Router) {

    //Obtencion del nombre del user logueado
    this.UserName = sessionStorage.getItem('nombres')!;


  }

  //Ciclo de vida para llenar la informacion de los cards con los datos obtenidos del servicio
  ngOnInit(): void {

    //Modificacion del titulo de la aplicacion
    document.title = "Home - Informacion General";


    this._TaskService.GetCountTask(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Registros = Response,
      err => console.log(err))

    this._TaskService.GetCountTaskPendiente(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Pendientes = Response,
      err => console.log(err))

    this._TaskService.GetCountTaskCompleted(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Completadas = Response,
      err => console.log(err))

  }


}
