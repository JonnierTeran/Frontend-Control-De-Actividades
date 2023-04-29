import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActualizarTaskComponent } from 'src/app/Modals/actualizar-task/actualizar-task.component';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas-completadas',
  templateUrl: './tareas-completadas.component.html',
  styleUrls: ['./tareas-completadas.component.css'],
})
export class TareasCompletadasComponent implements OnInit {
  UserName: String;
  Completadas: Tarea[];

  constructor(
    private _TaskService: TaskService,
    private _Router: Router,
    private _modalService: NgbModal
  ) {
    this.UserName = sessionStorage.getItem('nombres')!;
    this.Completadas = [];
  }

  ngOnInit(): void {
    this._TaskService
      .GetTasktUserCompletada(+sessionStorage.getItem('Id')!)
      .subscribe(
        (Responsee) => {
          this.Completadas = Responsee;
        },
        (Err) => console.log(Err)
      );

    document.title = 'Tareas Competadas';
  }

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

  Detalles() {
    this._Router.navigate(['PageInitial/Detalles']);

    document.title = 'Formularo De registro';
  }

  PendienteTask(Id_Task: number): void {
    Swal.fire({
      title: 'Realmente desea marcar esta tarea como pendiente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
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
          (Err) => console.log(Err)
        );
      }
    });
  }

  EliminarTarea(Id_Task: number): void {
    Swal.fire({
      title: 'Eliminar Tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
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
                (Err) => console.log(Err)
              );
          },
          (Err) => console.log(Err)
        );
      }
    });
  }

  openModal(item: Tarea) {
    const modalRef = this._modalService.open(ActualizarTaskComponent, {
      keyboard: false,
      backdrop: 'static',
    });
    modalRef.componentInstance.item = item;

    modalRef.result
      .then((result) => {
        this._TaskService
          .GetTasktUserCompletada(+sessionStorage.getItem('Id')!)
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
