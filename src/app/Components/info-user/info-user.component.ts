import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/services/task';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent {
  UserName:string;
  LastName:string
  Email:string;
  Registros!:number;
  Pendientes!:number;
  Completadas!:number;

  constructor(private _TaskService: TaskService, private _Router:Router){
    this.UserName = sessionStorage.getItem('nombres')!;
    this.LastName = sessionStorage.getItem('apellidos')!;
    this.Email = sessionStorage.getItem('email')!;
    
  }
  ngOnInit(): void {
  

    this._TaskService.GetCountTask(+sessionStorage.getItem('Id')!).subscribe(
       Response => this.Registros = Response ,
       err => console.log(err))
    
    this._TaskService.GetCountTaskPendiente(+sessionStorage.getItem('Id')!).subscribe(
        Response => this.Pendientes = Response ,
        err => console.log(err))
    
    this._TaskService.GetCountTaskCompleted(+sessionStorage.getItem('Id')!).subscribe(
          Response => this.Completadas = Response ,
          err => console.log(err))
       
  }
}
