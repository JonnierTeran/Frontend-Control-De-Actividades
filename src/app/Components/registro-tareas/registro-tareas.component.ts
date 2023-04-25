import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { Usuario } from 'src/app/Models/models/usuario.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-tareas',
  templateUrl: './registro-tareas.component.html',
  styleUrls: ['./registro-tareas.component.css']
})
export class RegistroTareasComponent implements OnInit {

  Registro:FormGroup;

  constructor(private _FormBuilder:FormBuilder, private _TaskService:TaskService, private _Router:Router){

    this.Registro = this._FormBuilder.group({
      titulo: ['' , Validators.required],
      descripcion: ['' , Validators.required],
      estado:['', Validators.required]
    })
  }
  
  ngOnInit(): void {
    document.title = "Registro De Tareas";
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
      })
  }


  Registrar():void{
    let Task:Tarea;
    let User:Usuario;
    User = new Usuario(sessionStorage.getItem('nombres')!, sessionStorage.getItem('apellidos')!,
                      sessionStorage.getItem('email')!, '',+sessionStorage.getItem('Id')!);

    Task = new Tarea(this.Registro.get('titulo')!.value,this.Registro.get('descripcion')!.value,
                    this.Registro.get('estado')!.value, User);

    this._TaskService.RegTask(Task).subscribe
              (Response => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: Response.Mensaje,
                  showConfirmButton: false,
                  timer: 2000
                });
            
                //Redireccion a pagina principal
                this._Router.navigate(["/PageInitial/Detalles"]);
                document.title = "Control de Actividades - Home";
          
              }, Err => console.log(Err))
    
    
  }


  public Cancelar():void{

    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })

    //Redireccion a pagina principal
    this._Router.navigate(["/PageInitial/Detalles"]);
    document.title = "Control de Actividades - Home";

  }
  }


