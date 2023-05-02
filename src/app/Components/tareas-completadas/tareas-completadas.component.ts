//Modulos
import { Component, OnInit } from '@angular/core';

//Servicios
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/Services/services/task';

//Modelos de datos
import { Tarea } from 'src/app/Models/models/tarea.model';

//Componentes
import { ActualizarTaskComponent } from 'src/app/Modals/actualizar-task/actualizar-task.component';

//Liberia de Alerts
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.component.html',
  styleUrls: ['./tareas-completadas.component.css'],
})
export class TareasCompletadasComponent implements OnInit {
  
  //Propiedades
  UserName: String;
  Completadas: Tarea[];


  //inicializacion de propiedad e injeccion de servicios
  constructor( private _TaskService: TaskService, private _Router: Router, 
    private _modalService: NgbModal) {

    // inicializacion de atributos
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Completadas = [];
  }


  //Ciclo de vida para cargar desde el servicio las tareas Completadas
  public ngOnInit(): void {
      this._TaskService.GetTasktUserCompletada(+sessionStorage.getItem('Id')!)
        .subscribe(
          Responsee => {
            this.Completadas = Responsee;
          },
          Err => console.log(Err)
        );

      //Cambio de titulo
      document.title = 'Tareas Competadas';
  }

  
  //Metodo para navegar al componente para registrar una tarea
  public RegistrarN():void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    this._Router.navigate(['PageInitial/Registros']);

    document.title = 'Formularo De registro';
  }

  //Metodo para navegar al componente de detalles
  public Detalles(): void {
    this._Router.navigate(['PageInitial/Detalles']);

    document.title = 'Formularo De registro';
  }


  //Metodo para actualizar el estado de una tarea a Pendiente
  public PendienteTask(Id_Task: number): void {
    Swal.fire({
      title: 'Realmente desea marcar esta tarea como pendiente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) { // Si el usuario confirma se actualiza por el metodo del servicio
        this._TaskService.EditTaskPendiente(Id_Task).subscribe(
          (Response) => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: Response.Mensaje,
              showConfirmButton: false,
              timer: 2500,
            });

            this._Router.navigate(['PageInitial/taskpendientes']);
            document.title = 'Home - Informacion general';

          },
          (Err) => console.log(Err));
      }

    });

  }


  //Metodo para Eliminar Una Tarea por el metodo del servicio
  public EliminarTarea(Id_Task: number): void {
    Swal.fire({
      title: 'Eliminar Tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {  //Confirmacion del usuario y Eliminacion de la tarea
        this._TaskService.DeleteTask(Id_Task).subscribe(
          (Response) => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: Response.Mensaje,
              showConfirmButton: false,
              timer: 2500,
            });

            this._TaskService
              .GetTasktUserCompletada(+sessionStorage.getItem('Id')!)
              .subscribe(
                (Responsee) => {
                  this.Completadas = Responsee;
                },
                (Err) => console.log(Err));
          },

          (Err) => console.log(Err));

      }

    });

  }

  //Metodo para abrir el modal de actualizacion de tareas
  public openModal(item: Tarea) {
  
    // Abre el modal de actualizar task
    const modalRef = this._modalService.open(ActualizarTaskComponent, {
      keyboard: false,
      backdrop: 'static',
    });

    //Envio de una tarea al atributo item del componente modal
    modalRef.componentInstance.item = item;

    //Manejo de Respuesta de Cierre del modal close()
    modalRef.result.then((result) => {
      
      //Se Vuelven a cargar las tareas completadas  
      this._TaskService.GetTasktUserCompletada(+sessionStorage.getItem('Id')!)
          .subscribe(
            (Responsee) => {
              this.Completadas = Responsee;
            },
            (Err) => console.log(Err)
          );
      })
      .catch((Error) => {
        console.log('asd', Error);
      });
  }
}
