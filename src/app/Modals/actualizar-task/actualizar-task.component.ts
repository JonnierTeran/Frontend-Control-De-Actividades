import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from 'src/app/Models/models/tarea.model';
import { TaskService } from 'src/app/Services/services/task';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-task',
  templateUrl: './actualizar-task.component.html',
  styleUrls: ['./actualizar-task.component.css'],
})
export class ActualizarTaskComponent implements OnInit {
  item!: Tarea;
  Actualizacion: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _FormBuilder: FormBuilder,
    private _TaskService: TaskService
  ) {
    this.Actualizacion = this._FormBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.Actualizacion.controls['titulo'].setValue(this.item.titulo);
    this.Actualizacion.controls['descripcion'].setValue(this.item.descripcion);
    this.Actualizacion.controls['estado'].setValue(this.item.estado);
  }

  Actualizar(): void {
    let TaskEdit: Tarea;
    TaskEdit = new Tarea(
      this.Actualizacion.get('titulo')!.value,
      this.Actualizacion.get('descripcion')!.value,
      this.Actualizacion.get('estado')!.value,
      this.item.id_user,
      this.item.id
    );

    if (this.Actualizacion.valid) {
      this._TaskService.RegTask(TaskEdit).subscribe(
        (Response) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: Response.Mensaje,
            showConfirmButton: false,
            timer: 2000,
          });

          this.activeModal.close('Tarea Actualizada con exito');
        },
        (Err) => console.log(Err)
      );
    }
  }
}
