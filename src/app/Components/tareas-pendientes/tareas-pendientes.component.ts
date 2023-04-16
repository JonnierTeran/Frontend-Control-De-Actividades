import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-pendientes.component.html',
  styleUrls: ['./tareas-pendientes.component.css']
})
export class TareasPendientesComponent implements OnInit {
  UserName:String;
  Pendientes:Tarea[];

  constructor(private _TaskService:TaskService){
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Pendientes=[];
  }

  
  ngOnInit(): void {
    this._TaskService.GetTasktUserPendientes(+sessionStorage.getItem('Id')!).subscribe
                (Responsee =>{
                  this.Pendientes = Responsee;
                }, Err=> console.log(Err))
               
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2500
                })
              
                document.title = "Tareas Pendientes";
  }



}
