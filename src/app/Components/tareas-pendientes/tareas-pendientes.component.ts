import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _TaskService:TaskService, private _Router:Router){
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Pendientes=[];
  }

  
  ngOnInit(): void {
    this._TaskService.GetTasktUserPendientes(+sessionStorage.getItem('Id')!).subscribe
                (Responsee =>{
                  this.Pendientes = Responsee;
                }, Err=> console.log(Err))
               
               
              
                document.title = "Tareas Pendientes";
  }


  RegistrarN(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })

    this._Router.navigate(["PageInitial/Registros"]);
  
    document.title = "Formularo De registro";

  }

  Detalles(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })

    this._Router.navigate(["PageInitial/Detalles"]);
  
    document.title = "Home - Informacion general";

  }


  CompletarTask(Id_Task:number):void{
    Swal.fire({
      title: 'Realmente desea marcar esta tarea como Completada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._TaskService.CompletarTask(Id_Task).subscribe
        (Response =>{          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: Response.Mensaje,
            showConfirmButton: false,
            timer: 2500
          })
          this._Router.navigate(["PageInitial/taskCompletadas"]);
          document.title = "Home - Informacion general";
          
        }, Err => console.log(Err))
      }
    })
    
  }


  EliminarTarea(Id_Task:number):void{
    Swal.fire({
      title: 'Eliminar Tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._TaskService.DeleteTask(Id_Task).subscribe
        (Response =>{          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: Response.Mensaje,
            showConfirmButton: false,
            timer: 2500
          })
          
          this._TaskService.GetTasktUserPendientes(+sessionStorage.getItem('Id')!).subscribe
                (Responsee =>{
                  this.Pendientes = Responsee;
                }, Err=> console.log(Err))
         
                
        }, Err => console.log(Err))
      }
    })
  }
}
