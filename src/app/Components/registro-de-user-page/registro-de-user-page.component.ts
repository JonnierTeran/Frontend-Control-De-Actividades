import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/models/usuario.model';
import { User } from 'src/app/Services/services/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-de-user-page',
  templateUrl: './registro-de-user-page.component.html',
  styleUrls: ['./registro-de-user-page.component.css']
})
export class RegistroDeUserPageComponent implements OnInit{

  public Registro:FormGroup; //Formulario Reactivo
  
  constructor(private _Router:Router,
    private _formBuilder: FormBuilder,
    private _UserSerice:User){

      //Inicializacion del formulario                
    this.Registro = this._formBuilder.group({
      nombres : ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['',  [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$') ]],
      contraseña : ['', Validators.required]
    })
    }

    ngOnInit(): void {
      this.Registro.reset;
  }


  Cancelar():void{
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000
    })
    this._Router.navigate(["Loggin"]);
    document.title = "Loggin / Inicio de Session";



  }

  public Registrar(){
    
    let Obj:Usuario;
    Obj = this.Registro.value;
    this._UserSerice.GetNewUser(Obj).subscribe(
      Response => {
         //Alerta de confirmacion
         Swal.fire({
          position: 'center',
          icon: 'info',
          title: Response.Mensaje,
          showConfirmButton: true,
      
        });

        this.Registro.reset();
        this._Router.navigate(["Loggin"]);
        document.title = "Loggin / Inicio de Session";
        
      }, Error =>{
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
