import { Component, OnInit } from '@angular/core';
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
  public constructor(private _TaskService:TaskService){
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

}
