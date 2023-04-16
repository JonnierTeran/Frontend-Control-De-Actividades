import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Services/services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loggin-page',
  templateUrl: './loggin-page.component.html',
  styleUrls: ['./loggin-page.component.css']
})
export class LogginPageComponent implements OnInit {
  
  public Session:FormGroup; //Formulario Reactivo
  
  //inyeccion de servicioos
  constructor(private _Router:Router,
              private _formBuilder: FormBuilder,
              private _UserSerice:User){

    //Inicializacion del formulario                
    this.Session = this._formBuilder.group({
      email: ['', Validators.required],
      contraseña : ['', Validators.required]
    })

  }


  public ngOnInit(): void {
      //console.log("Loggin");
  }


  //Logg de usuario
  public Loggin():void{
    if(this.Session.valid){
      this._UserSerice.UserByEmail(this.Session.get('email')!.value).subscribe(
        Response => {
          console.log(Response);
          //Validacion del formulario y el objeto usuario obtenido
            if (this.Session.get('email')!.value == Response.email 
                && this.Session.get('contraseña')!.value == Response.contraseña) {
                
                  //Alerta de confirmacion
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido ' + Response.nombres,
                    showConfirmButton: false,
                    timer: 2000
                  });

                  //Almacenamiento de datos en Session Storage
                  sessionStorage.setItem('Id', Response.id);
                  sessionStorage.setItem('email', Response.email);
                  sessionStorage.setItem('nombres', Response.nombres);
                  sessionStorage.setItem('apellidos', Response.apellidos);

                  //Redireccion a pagina principal
                  this._Router.navigate(["/PageInitial/Detalles"]);
                  document.title = "Control de Actividades - Home";
                  
              
              
            }
            
            else{
              //Informacion de Error de credenciales
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: Response.name, 
                showConfirmButton: false,
                timer: 2500
              })

            }

        }
        , Err => {
          //Informacion de falla de Solicitud http
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¡Ups!  Algo salio mal, intenta mas tarde',
            showConfirmButton: false,
            timer: 3000
          })

          console.log(Error);  })
    }
  }


  //Redireccion para registrar
  public SingUp():void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
    this._Router.navigate(["RegistrarUser"]);
    document.title = "Registro de Usuarios";

  }


}
