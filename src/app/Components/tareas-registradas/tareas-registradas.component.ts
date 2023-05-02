import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarTaskComponent } from 'src/app/Modals/actualizar-task/actualizar-task.component';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-registradas',
  templateUrl: './tareas-registradas.component.html',
  styleUrls: ['./tareas-registradas.component.css'],
})
export class TareasRegistradasComponent implements OnInit {
  UserName: string;
  Task: Tarea[];

  //Injecction de servicios e inicializacion 
  public constructor( private _TaskService: TaskService, private _Router: Router,
                        private _modalService: NgbModal ) {
                          
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Task = [];
  }

  //Ciclo de vida para cargar Tareas pendentes con el servicio
  public ngOnInit(): void {
    this._TaskService.GetTasktUser(+sessionStorage.getItem('Id')!).subscribe(
      (Response) => {
        this.Task = Response;
        console.log(this.Task);
      },
      (Error) => console.log(Error)
    );

    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 2500,
    });

    document.title = 'Tareas Registradas';
  }


  //Metodo de navegacion para ir al componente de registros 
  RegistrarN() {
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
  public Detalles(): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    });

    this._Router.navigate(['PageInitial/Detalles']);

    document.title = 'Formularo De registro';
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

            //Consulta de tareas 
            this._TaskService
              .GetTasktUser(+sessionStorage.getItem('Id')!)
              .subscribe(
                (Response) => {
                  this.Task = Response;
                },
                (Error) => console.log(Error)
              );
          },
          (Err) => console.log(Err)
        );
      }
    });
  }



  //Metodo para abrir el modal de edit de las tareas
  public openModal(item: Tarea): void {
    //abrir el modal
    const modalRef = this._modalService.open(ActualizarTaskComponent, {
      keyboard: false,
      backdrop: 'static',
    });

    //Envia datos a la propiedad item del componente de actualizar
    modalRef.componentInstance.item = item;


    //Manejo y accion de la respuesta de cierre (close())
    modalRef.result
      .then((result) => {

        this._TaskService
          .GetTasktUser(+sessionStorage.getItem('Id')!)
          .subscribe(
            (Response) => {
              this.Task = Response;
            },
            (Error) => console.log(Error)
          );

      }).catch((Error) => {
        console.log('asd', Error);
      });
  }
}
