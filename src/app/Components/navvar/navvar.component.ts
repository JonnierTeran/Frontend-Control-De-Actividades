//Modulos del componente
import { Component, OnInit } from '@angular/core';

//Servicios
import { Router } from '@angular/router';

//Librerias de alertas
import Swal from 'sweetalert2';

//Declaracion del componente
@Component({
  selector: 'app-navvar',
  templateUrl: './navvar.component.html',
  styleUrls: ['./navvar.component.css']
})
//Logica del componente
export class NavvarComponent implements OnInit {

  //Injeccion de Servicios
  constructor(private _Router: Router) { }


  //ciclo de vida del componente para cambiar el titulo de la aplicacion
  public ngOnInit(): void {
    document.title = "Control de Actividades - Home";

  }


  //Metodo para cerrar sesion
  public CerrarSesion():void {

    //Eliminacion del Sesion Storage
    sessionStorage.clear();

    //Alarma de informacion
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })

    //Redireccion
    this._Router.navigate(["Loggin"]);

    //Cambio del titulo de la aplicacion
    document.title = "Loggin / Inicio de Session";

  }

}
