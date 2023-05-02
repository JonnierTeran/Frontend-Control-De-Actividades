//Modulos del servicio
import { Observable, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

//Modelos de datos
import { Usuario } from "src/app/Models/models/usuario.model";

@Injectable() 
export class User {
    
    //Url de endPoints
    private Url:string;

    //Injeccion de servicios externos e inicializacion de ruta
    constructor(private _HttpClient:HttpClient){
        this.Url = 'http://localhost:8080/app/Users';
    }


    //Buscar un usuario por email
    public  UserByEmail(email:string):Observable<any>{
        return this._HttpClient.get(this.Url+'/UserEmail/' + email).pipe(
            map((User:any) => User || {name: 'No se Encontro un usuario Registrado con estas credenciales'}));

    }

    //Registrar un usuario
    public GetNewUser(User:Usuario):Observable<any>{
        return this._HttpClient.post(this.Url +'/Registrar' , User);
    }

    //Actualizar Informacion de Usuario
    public UpdateUser(User:Usuario):Observable<any>{
        return this._HttpClient.put(this.Url + "/Update" , User);
    }

    
    //Actualizar Contraseña de Usuario
    public UpdatePass(User:Usuario):Observable<any>{
        return this._HttpClient.put(this.Url + "/Update/pass" , User);
    }
      
    

}
