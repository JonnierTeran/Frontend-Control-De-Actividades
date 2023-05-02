//Modulos del componente
import { Component } from '@angular/core';

//Servicios del componente
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/Services/services/task';

//modelos de datos
import { Usuario } from 'src/app/Models/models/usuario.model';

//Componentes 
import { ActualizarCuentaComponent } from 'src/app/Modals/actualizar-cuenta/actualizar-cuenta.component';
import { ActualizarPasswordComponent } from 'src/app/Modals/actualizar-password/actualizar-password.component';


//Declaracion del componente
@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
//Logica del componente
export class InfoUserComponent {

  //Atributos del componente
  UserName: string;
  LastName: string
  Email: string;
  Registros!: number;
  Pendientes!: number;
  Completadas!: number;

  //Inicializacion de atributos  e injeccion de servicios
  public constructor(private _TaskService: TaskService, private _Router: Router, 
                    private _modalService: NgbModal) {

    this.UserName = sessionStorage.getItem('nombres')!;
    this.LastName = sessionStorage.getItem('apellidos')!;
    this.Email = sessionStorage.getItem('email')!;

  }


  //Ciclo de vida
  public ngOnInit(): void {


    this._TaskService.GetCountTask(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Registros = Response,
      err => console.log(err))

    this._TaskService.GetCountTaskPendiente(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Pendientes = Response,
      err => console.log(err))

    this._TaskService.GetCountTaskCompleted(+sessionStorage.getItem('Id')!).subscribe(
      Response => this.Completadas = Response,
      err => console.log(err))

  }


  //Metodo para abrir el modal de actualizar Informacion de usuario
  public openModal():void {

    //Abre el modal con esas caracteristicas 
    const modalRef = this._modalService.open(ActualizarCuentaComponent, {
      keyboard: false,
      backdrop: 'static',
    });

    //Le envia un Objeto de tipo usuario al componente del modal al atributo item
    modalRef.componentInstance.item = new Usuario(this.UserName, this.LastName, this.Email, '', +sessionStorage.getItem('Id')!);

    
    //Maneja el resultado de cierre del modal y ejecuta una accion
    modalRef.result
      .then((result) => {

        this.UserName = sessionStorage.getItem('nombres')!;
        this.LastName = sessionStorage.getItem('apellidos')!;
        this.Email = sessionStorage.getItem('email')!;

      }).catch((Error) => { //manejo de errores
        console.log('asd', Error);
      });


  }

  //Abre el modal de Actualizar Password
  public openModal2() {

    //Abre el modal del componente Actualizar pass
    const modalRef = this._modalService.open(ActualizarPasswordComponent, {
      keyboard: false,
      backdrop: 'static',
    });

  }


}
