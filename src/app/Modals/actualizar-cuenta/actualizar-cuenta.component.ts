//Modulos del componente
import { Component, Input, OnInit } from '@angular/core';

//Servicios del componente
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Services/services/user';

//Libreria para manejar el modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//Modelo de datos del compontent
import { Usuario } from 'src/app/Models/models/usuario.model';

//Libreria de Alertas Dinamicas
import Swal from 'sweetalert2';

//Declaracion del componente
@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css'],
})
//Logica del componente
export class ActualizarCuentaComponent implements OnInit {
  
  //Atributos del componente
  item!: Usuario; // Obtenido desde el componente que ejecuta el modal
  ActualizarUser: FormGroup; //Formulario Reactivo


  //Inicializacion de Atributos, Injeccion de Servicios
  public constructor( public activeModal: NgbActiveModal, private _FormBuilder: FormBuilder,
                      private _userService:User) {

    //Generacion del formulario Reactivo y sus validaciones
    this.ActualizarUser = this._FormBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    });
  }

  //ciclo de vida para dar formato al Formulario Reactivo
  public ngOnInit(): void {

    this.ActualizarUser.controls['nombres'].setValue(this.item.nombres);
    this.ActualizarUser.controls['apellidos'].setValue(this.item.apellidos);
    this.ActualizarUser.controls['email'].setValue(this.item.email);

  }


//Actualizar Una Cuenta
  public Actualizar(): void {
    //Se Editan Las propiedades del Objeto Traido desde el componente de ejecucion del modal
    this.item.nombres  = this.ActualizarUser.get('nombres')?.value;
    this.item.apellidos = this.ActualizarUser.get('apellidos')?.value
    
    //Ejecucion del servicio para actualizar un usuario
    this._userService.UpdateUser(this.item).subscribe
    ( Response => {

      //Mensaje de confirmacion al usuario
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: Response.Mensaje,
        showConfirmButton: false,
        timer: 2000,
      }); 

      //Actualizacion de datos en el Sesion Storage
      sessionStorage.setItem('nombres',this.ActualizarUser.get('nombres')?.value);
      sessionStorage.setItem('apellidos',this.ActualizarUser.get('apellidos')?.value);
      sessionStorage.setItem('email', this.ActualizarUser.get('email')?.value);

      //Cierre del modal y return de un resultado que sera leido en el componente que lo ejecute
      this.activeModal.close('Actualizado con exito');
      
      
    }, Error => console.log(Error)) //Manejo de errores de la solicitud

  }
}
