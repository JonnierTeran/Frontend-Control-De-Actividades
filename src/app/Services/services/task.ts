//Modulos del servicio
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

//modelo de datos para el servicio
import { Tarea } from "src/app/Models/models/tarea.model";

//Logica del servicio
@Injectable() //Injectable de servicios externos
export class TaskService {
    
  //Rutas de EndPoints
    private Url:string;

    //Injeccion del servicios exteros e inicializacion de atributos
    constructor(private _HttpClient:HttpClient){
        this.Url = 'http://localhost:8080/app/task';
    }


    //Registrar Treas Por usuario
    public RegTask(Task:Tarea):Observable<any>{
      return this._HttpClient.post(this.Url +'/Registro', Task);
    }

   //Ver Tareas Por usuario
   public GetTasktUser(idUser:number):Observable<any>{
     return this._HttpClient.get<any>(this.Url+'/Details/taskUser/' +idUser);
   }

   //Ver Tareas Pendientes Por usuario
   public GetTasktUserPendientes(idUser:number):Observable<any>{
    return this._HttpClient.get<any>(this.Url+'/Details/Pendiente/' +idUser);
  }

  //Ver Tareas Completada Por usuario
  public GetTasktUserCompletada(idUser:number):Observable<any>{
    return this._HttpClient.get<any>(this.Url+'/Details/Completada/' +idUser);
  }
   
    //Cantidad de Tareas por usuario
    public GetCountTask(idUser:number):Observable<any>{
        return this._HttpClient.get<any>(this.Url +'/Count/'+ idUser);
    }

   

    //Cantidad de tareas Pendientes por usuario
    public GetCountTaskPendiente(idUser:number):Observable<any>{
        return this._HttpClient.get<any>(this.Url +'/Count/Pendientes/'+ idUser);
    }   

    //Cantidad de tareas Completadas por Usuario
    public GetCountTaskCompleted(idUser:number):Observable<any>{
        return this._HttpClient.get<any>(this.Url +'/Count/Completed/'+ idUser);
    }

    //Actualizar Estado a Completada
    public CompletarTask(id_Task:Number):Observable<any>{
      return this._HttpClient.get<any>(this.Url+"/ActualizarCompletada/"+id_Task);

    }

     //Actualizar Estado a pendiente
     public EditTaskPendiente(id_Task:Number):Observable<any>{
      return this._HttpClient.get<any>(this.Url+"/ActualizarPendiente/"+id_Task);

    }

    //Eliminar Tarea
    public DeleteTask(id:number):Observable<any>{
      return this._HttpClient.delete(this.Url+"/Delete/"+id);
    }

    

}
