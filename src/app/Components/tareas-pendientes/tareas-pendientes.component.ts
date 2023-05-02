//Modulos
import { Component, OnInit } from '@angular/core';

//Servicios
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/Services/services/task';

//Models
import { Tarea } from 'src/app/Models/models/tarea.model';

//Components
import { ActualizarTaskComponent } from 'src/app/Modals/actualizar-task/actualizar-task.component';

//Libs
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-pendientes',
  templateUrl: './tareas-pendientes.component.html',
  styleUrls: ['./tareas-pendientes.component.css'],
})
export class TareasPendientesComponent implements OnInit {
  UserName: String;
  Pendientes: Tarea[];

  //Injecction de servicios e inicializacion 
  constructor(private _TaskService: TaskService, private _Router: Router, private _modalService: NgbModal) {
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Pendientes = [];
  }

  //Ciclo de vida para cargar Tareas pendentes con el servicio
  public ngOnInit(): void {
    this._TaskService.GetTasktUserPendientes(+sessionStorage.getItem('Id')!)
      .subscribe(
        (Responsee) => {
          this.Pendientes = Responsee;
        },
        (Err) => console.log(Err)
      );

    document.title = 'Tareas Pendientes';
  }


  //Metodo de navegacion para ir al componente de registros 
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

  //Metodo de navegacion para ir a componente de detalles
  public Detalles():void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    this._Router.navigate(['PageInitial/Detalles']);

    document.title = 'Home - Informacion general';
  }


  //Metodo para actualizar el estado de una tarea de pendiente a completada
  public CompletarTask(Id_Task: number): void {
    Swal.fire({
      title: 'Realmente desea marcar esta tarea como Completada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) { //Confimacion del usuario
        
        //Actualizacion
        this._TaskService.CompletarTask(Id_Task).subscribe(
          (Response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: Response.Mensaje,
              showConfirmButton: false,
              timer: 2500,
            });
            this._Router.navigate(['PageInitial/taskCompletadas']);
            document.title = 'Home - Informacion general';
          },
          (Err) => console.log(Err)
        );
      }
    });
  }

  //Metodo para eliminar una tarea
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
      if (result.isConfirmed) { //Confimacion

        //Eliminacion
        this._TaskService.DeleteTask(Id_Task).subscribe(
          (Response) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: Response.Mensaje,
              showConfirmButton: false,
              timer: 2500,
            });

            //Consulta de tareas pendientes
            this._TaskService
              .GetTasktUserPendientes(+sessionStorage.getItem('Id')!)
              .subscribe(
                (Responsee) => {
                  this.Pendientes = Responsee;
                },
                (Err) => console.log(Err)
              );
          },
          (Err) => console.log(Err)
        );
      }
    });
  }


  //Metodo para abrir el modal de edit de las tareas
  public openModal(item: Tarea):void {
    //abrir el modal
    const modalRef = this._modalService.open(ActualizarTaskComponent, {
      keyboard: false,
      backdrop: 'static',
    });
    //Envia datos a la propiedad item del componente de actualizar
    modalRef.componentInstance.item = item;

    //Manejo y accion de la respuesta de cierre (close())
    modalRef.result.then((result) => {

        this._TaskService.GetTasktUserPendientes(+sessionStorage.getItem('Id')!)
          .subscribe(
            (Responsee) => {
              this.Pendientes = Responsee;
            },
            (Err) => console.log(Err)
          );


      }).catch((Error) => {
        console.log('asd', Error);
      });
  }
}
