export class Usuario {
    private id?:number;
    private nombres:string;
    private apellidos:string;
    private email:string;
    private contraseña:string;

    constructor(nombres:string, apellidos:string, email:string, contraseña:string){
        this.nombres= nombres;
        this.apellidos= apellidos;
        this.email = email;
        this.contraseña=contraseña;

    }
    
    public set Id(id : number) {
        this.id = id;
    }
    

    
    public get Id():number{
        return this.id!;
    }

    
    public set Nombres(nombres : string) {
        this.nombres = nombres;
    }
    
    
    public get Nombres():string {
        return this.nombres;
    }

    
    public set Apellidos(apellidos : string) {
        this.apellidos = apellidos;
    }
    
    public get Apellidos():string {
        return this.apellidos;
    }

    
    public set Email(email : string) {
        this.email = email;
    }
    
    public get Email():string {
        return this.email;
    }

    
    public set Contraseña(contraseña : string) {
        this.contraseña = contraseña;
    }
    
    
    public get Contraseña():string {
        return this.contraseña;
    }

}
