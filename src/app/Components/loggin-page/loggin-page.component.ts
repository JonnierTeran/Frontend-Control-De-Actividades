import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/models/usuario.model';
import { User } from 'src/app/Services/services/user';

@Component({
  selector: 'app-loggin-page',
  templateUrl: './loggin-page.component.html',
  styleUrls: ['./loggin-page.component.css']
})
export class LogginPageComponent implements OnInit {
  
  public Session:FormGroup;
  

  constructor(private _Roter:Router,
              private _formBuilder: FormBuilder,
              private _UserSerice:User){

    this.Session = this._formBuilder.group({
      email: ['', Validators.required],
      contraseña : ['', Validators.required]
    })

  }


  public ngOnInit(): void {
      console.log("Loggin");
  }

  public Loggin():void{
    if(this.Session.valid){
      this._UserSerice.UserByEmail(this.Session.get('email')!.value).subscribe(
        Response => {
            if (this.Session.get('email')!.value == Response.email) {
              console.log('Exitoso');
              console.log(Response);
              console.log(this.Session.get('email')!.value);

            }

        }
        , Err => console.log(Err) 
        
        )

    }
    //console.log(this.Session.value);
  }
  public SingUp():void{
    this._Roter.navigate(["RegistrarUser"]);
    document.title = "Registro de Usuarios";

  }


}
