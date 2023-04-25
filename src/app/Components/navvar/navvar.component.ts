import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navvar',
  templateUrl: './navvar.component.html',
  styleUrls: ['./navvar.component.css']
})
export class NavvarComponent implements OnInit{

  constructor(private _Router:Router ){}


  ngOnInit(): void {
    document.title = "Control de Actividades - Home";

  }

  CerrarSesion(){
    sessionStorage.clear();
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
    this._Router.navigate(["Loggin"]);
    document.title = "Loggin / Inicio de Session";

  }

}
