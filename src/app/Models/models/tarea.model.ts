//Modelo usuario
import { Usuario } from "./usuario.model";


export class Tarea {
    //Atributos de una tarea
    id?: number;
    titulo: string;
    descripcion: string;
    estado: string;
    id_user: Usuario; //Objeto de tipo Usuario

    //Inicializacion de atributos
    constructor(titulo: string, descripcion: string, estado: string, id_user: Usuario, id?: number) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.id_user = id_user;
    }


    //Gett y sett 
    public set Id(Id: number) {
        this.id = Id;
    }


    public getId(): number {
        return this.id!;
    }


    public set Titulo(titulo: string) {
        this.Titulo = titulo;
    }


    public getTitulo(): string {
        return this.titulo;
    }


    public set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }



    public getDescripcion(): string {
        return this.descripcion;
    }

    public set Estado(estado: string) {
        this.estado = estado;
    }


    public getEstado(): string {
        return this.estado;
    }


    public set Id_user(user: Usuario) {
        this.id_user = user;
    }


    public getId_user(): Usuario {
        return this.Id_user
    }

}
