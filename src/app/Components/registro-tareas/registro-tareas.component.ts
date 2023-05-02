//Modulos
import { Component, OnInit } from '@angular/core';

//Servicios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Services/services/task';

//Modelos de datos
import { Tarea } from 'src/app/Models/models/tarea.model';
import { Usuario } from 'src/app/Models/models/usuario.model';

//Libreria de alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-tareas',
  templateUrl: './registro-tareas.component.html',
  styleUrls: ['./registro-tareas.component.css']
})
export class RegistroTareasComponent implements OnInit {

  Registro: FormGroup; //Formulario Reactivo

  //Inicializacion de Atributos e Injeccion de Servicios
  constructor(private _FormBuilder: FormBuilder, private _TaskService: TaskService, private _Router: Router) {

    //Formulario Reactivo
    this.Registro = this._FormBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required]
    })
  }

  //Ciclo de vida
  public ngOnInit(): void {
    document.title = "Registro De Tareas";
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500
    })
  }


  //Metodo para registrar una tarea
  public Registrar(): void {
    
    //Creacion del Objeto de la tarea a Registrar
    let Task: Tarea;
    let User: Usuario;

    //Creacion del usuario
    User = new Usuario(sessionStorage.getItem('nombres')!, sessionStorage.getItem('apellidos')!,
      sessionStorage.getItem('email')!, '', +sessionStorage.getItem('Id')!);

    //Tarea a Registrar
    Task = new Tarea(this.Registro.get('titulo')!.value, this.Registro.get('descripcion')!.value,
      this.Registro.get('estado')!.value, User);

    //Metodo del servicio para Registrar la tarea
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


  //Metodo para cancelar el registro
  public Cancelar(): void {

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


