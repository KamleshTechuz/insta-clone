import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:3000/"

  constructor(public _http: HttpClient) { }

  addUser(data: any) {
    return this._http.post(this.url + 'signup', data)
  }
  loginUser(data: any) {
    return this._http.post(this.url + 'login', data)

  }

  getUser(){
    const header = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization' : `${localStorage.getItem('token')}`
    })
    return this._http.get(this.url + 'getuser', {headers: header})
  }

  editUser(data: any) {
    const header = new HttpHeaders({
      'content-type' : 'application/json',
      'Authorization' : `${localStorage.getItem('token')}`
    })
    return this._http.post(this.url + `profile/edit`, data,  {headers: header})

  }
}
