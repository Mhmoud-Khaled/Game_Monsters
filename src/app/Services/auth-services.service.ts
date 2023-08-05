import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  baseURL:string = 'https://route-ecommerce.onrender.com/'
  userData = new BehaviorSubject(null)

  constructor(private _HttpClient: HttpClient, private _router:Router) {
    if(localStorage.getItem('token')){
      this.decodedUserData()
    }
  }

  decodedUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('token'))
    let decodedToken:any = jwtDecode(encodedToken)
    this.userData.next(decodedToken)
  }

  signup(model:any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'api/v1/auth/signup', model)
  }

  login(model:object):Observable<any>{
    return this._HttpClient.post(this.baseURL+'api/v1/auth/signin',model)
  }

  logout(){
    localStorage.removeItem("token")
    this.userData.next(null)
    this._router.navigate(['/login'])
  }

}
