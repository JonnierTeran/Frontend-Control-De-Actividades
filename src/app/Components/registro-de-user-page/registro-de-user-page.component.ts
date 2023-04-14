import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-de-user-page',
  templateUrl: './registro-de-user-page.component.html',
  styleUrls: ['./registro-de-user-page.component.css']
})
export class RegistroDeUserPageComponent {

  constructor(private _Router:Router){}


  Cancelar():void{
    this._Router.navigate(["Loggin"]);
    document.title = "Loggin / Inicio de Session";



  }
}
