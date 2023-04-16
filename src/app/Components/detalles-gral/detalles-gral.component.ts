import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/services/task';

@Component({
  selector: 'app-detalles-gral',
  templateUrl: './detalles-gral.component.html',
  styleUrls: ['./detalles-gral.component.css']
})
export class DetallesGralComponent implements OnInit{
  UserName:string;
  Registros!:number;
  Pendientes!:number;
  Completadas!:number;

  constructor(private _TaskService: TaskService, private _Router:Router){
    this.UserName = sessionStorage.getItem('nombres')!;
  
    
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
