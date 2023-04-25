import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-registradas',
  templateUrl: './tareas-registradas.component.html',
  styleUrls: ['./tareas-registradas.component.css']
})
export class TareasRegistradasComponent implements OnInit{

  UserName:string;
  Task:Tarea[];

  public constructor(private _TaskService:TaskService, private _Router:Router){

    this.UserName = sessionStorage.getItem('nombres')!;
    this.Task=[];
  }


  ngOnInit(): void {
    this._TaskService.GetTasktUser(+sessionStorage.getItem('Id')!).subscribe
    (Response =>{
      this.Task= Response;
    }, Error => console.log(Error))

    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    })
  
    document.title = "Tareas Registradas";

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
  
    document.title = "Formularo De registro";

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

          this._TaskService.GetTasktUser(+sessionStorage.getItem('Id')!).subscribe
                (Response =>{
                this.Task= Response;
                }, Error => console.log(Error))
                
        }, Err => console.log(Err))
      }
    })
  }
}
