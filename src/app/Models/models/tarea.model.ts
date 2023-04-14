import { Usuario } from "./usuario.model";

export class Tarea {
    private id?:number;
    private titulo:string;
    private descripcion:string;
    private estado:string;
    private id_user:Usuario;

    constructor(titulo:string, descripcion:string, estado:string, id_user:Usuario){
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.id_user = id_user;
    }

    
    public set Id(Id : number) {
        this.id = Id;
    }

    
    public get Id():number{
        return this.id!;
    }

    
    public set Titulo(titulo : string) {
        this.Titulo = titulo;
    }

    
    public get Titulo() : string {
        return this.titulo;
    }

    
    public set Descripcion(descripcion : string) {
        this.descripcion = descripcion;
    }

    
    
    public get Descripcion() : string {
        return  this.descripcion;
    }
    
    public set Estado(estado : string) {
        this.estado = estado;
    }

    
    public get Estado() : string {
        return this.estado;
    }
    
    
    public set Id_user(user: Usuario) {
        this.id_user = user;
    }
    
    
    public get Id_user() : Usuario {
        return this.Id_user
    }
    
}
