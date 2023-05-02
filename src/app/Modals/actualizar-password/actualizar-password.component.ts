//Modulos del componente
import { Component } from '@angular/core';

//Servicios del componente
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Services/services/user';

//Libreria para manejar el modal
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

//modelo de datos
import { Usuario } from 'src/app/Models/models/usuario.model';

//liberia de alertas dinamicas
import Swal from 'sweetalert2';


//Declaracion del componente
@Component({
  selector: 'app-actualizar-password',
  templateUrl: './actualizar-password.component.html',
  styleUrls: ['./actualizar-password.component.css']
})
//logica del componente
export class ActualizarPasswordComponent {

  //Atributos del componente

  //Atributos para manejar alertas en el DOM
  public PassValid: Boolean;
  public NewPass: Boolean;
  
  //Formulario Reactivo
  public PassActualizacion: FormGroup;

  //Inicializacion de tributos e Injeccion de Servicios
  constructor(public activeModal: NgbActiveModal, private _FormBuilder: FormBuilder, 
              private _UserService: User) {

    this.NewPass = false;
    this.PassValid = false;

    //Inicializacion de Atributos
    this.PassActualizacion = this._FormBuilder.group({
        pass: ['', Validators.required],
        Newpass1: ['', [Validators.required, Validators.minLength(4)]],
        Newpass2: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  //Actualizar Contraseña
  public Actualizar():void {

    //Validacion que las Nuevas Contraseñas Ingresadas Sean Iguales
    if (this.PassActualizacion.controls['Newpass1'].value === this.PassActualizacion.controls['Newpass2'].value) {

      //Se Ejecuta Ek Servicio para Obtener La Informacion De Un Usuario
      this._UserService.UserByEmail(sessionStorage.getItem('email')!).subscribe
        (Response => {

          //Se Valida que la contraseña Ingresada Sea Igual a la del usuario Registrado
          if (this.PassActualizacion.controls['pass'].value === Response.contraseña) {
            
            //Se Crea un nuevo Usuario Con una diferente contraseña
            let User: Usuario;
            User = Response;
            User.contraseña = this.PassActualizacion.controls['Newpass1'].value;


            //Logic para actualizar contraseña, con el metodo del servicio
            this._UserService.UpdatePass(User).subscribe
                (Response => {

                  //Se cierra el modal y se registra un evento para ser leido en el componente que ejecuta el modal
                    this.activeModal.close('exit');

                    //Alerta de informacion al usuario de Actualizacion Exitosa
                    Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: Response.Mensaje,
                      showConfirmButton: false,
                      timer: 2000,
                    });



              }, Error => console.log(Error)) // Manejo de errores de la peticion para actualizar Contraseña

          } else {

            //Se activa la alterta de contraeña Invalida
            this.PassValid = true;
            //Formatea el Form
            this.PassActualizacion.reset();

          }

        }, error => console.log(error)) //manejo de Error En la peticon http para consultar un usuario


    } else {
      
      //Se activa la alerta de Contraseñas nuevas no coinciden y se formatea el formulario
      this.PassActualizacion.reset();
      this.NewPass = true;
    }


    //Luego de 5 Segundos de Oculta cualquier alerta de error generada
    setTimeout(() => {
      this.NewPass = false;
      this.PassValid = false;
    }, 5000);


  }

  
}
