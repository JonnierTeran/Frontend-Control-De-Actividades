import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.component.html',
  styleUrls: ['./tareas-completadas.component.css']
})
export class TareasCompletadasComponent implements OnInit{
  UserName:String;
  Completada:Tarea[];

  constructor(private _TaskService:TaskService){
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Completada=[];
  }
  
  ngOnInit(): void {
    this._TaskService.GetTasktUserCompletada(+sessionStorage.getItem('Id')!).subscribe
                (Responsee =>{
                  this.Completada = Responsee;
                }, Err=> console.log(Err))

     Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500
          })
              
      document.title = "Tareas Competadas";
  }
}
