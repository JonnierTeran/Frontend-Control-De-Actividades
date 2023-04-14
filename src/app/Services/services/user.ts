import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable() 
export class User {
    
    private Url:string;

    constructor(private _HttpClient:HttpClient){
        this.Url = 'http://localhost:8080/app/Users';
    }

    public  UserByEmail(email:string):Observable<any>{
        return this._HttpClient.get(this.Url+'/UserEmail/' + email);

    }
}
