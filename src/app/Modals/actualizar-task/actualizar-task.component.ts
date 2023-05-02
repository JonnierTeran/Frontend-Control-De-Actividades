//Modulos del componente
import { Component, OnInit } from '@angular/core';

//Servicios del componente
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/Services/services/task';

//Liberia de Modals
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Modelo de datos para el componente
import { Tarea } from 'src/app/Models/models/tarea.model';

//Libreria de alertas modals
import Swal from 'sweetalert2';

//Declaracion del componente
@Component({
  selector: 'app-actualizar-task',
  templateUrl: './actualizar-task.component.html',
  styleUrls: ['./actualizar-task.component.css'],
}) 
export class ActualizarTaskComponent implements OnInit { //Logica del componente
  //Atributos del componente
  public item!: Tarea; //procedente del componente donde se realice la instancia del modal
  public Actualizacion: FormGroup;

  //Inicializacion de atributos del componente e Injeccion de Servicios
  constructor( public activeModal: NgbActiveModal,
               private _FormBuilder: FormBuilder,
               private _TaskService: TaskService) {

    //Definicion del Formulario Reactivo y sus validaciones                
    this.Actualizacion = this._FormBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  //Ciclo de vida Usado para dar formato a los campos del componente
  public ngOnInit(): void {

    this.Actualizacion.controls['titulo'].setValue(this.item.titulo);
    this.Actualizacion.controls['descripcion'].setValue(this.item.descripcion);
    this.Actualizacion.controls['estado'].setValue(this.item.estado);

  }

  //Metodo para Actualizar una Tarea Registrada
  public Actualizar(): void {

    //Se Define el nuevo Objeto a Actualizar
    let TaskEdit: Tarea;
    TaskEdit = new Tarea(this.Actualizacion.get('titulo')!.value, this.Actualizacion.get('descripcion')!.value,
                         this.Actualizacion.get('estado')!.value, this.item.id_user, this.item.id );

    //Validacion del formulario                         
    if (this.Actualizacion.valid) {
      //Se Ejecuta el metodo del servicio para Actualizar una tarea y se Subscribe a sus Respuestas
      this._TaskService.RegTask(TaskEdit).subscribe(
        (Response) => {
          //Confirmacion de la actualizacion
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: Response.Mensaje,
            showConfirmButton: false,
            timer: 2000,
          });
          
          //Se cierra el modal y se Registra un resultado para manejar un procedimiento en el componente que ejecute el modals
          this.activeModal.close('Tarea Actualizada con exito');
        },
        (Err) => console.log(Err)); //manejo de error en la peticion http
      
    }

  }

}
