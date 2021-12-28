import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
    })
  };
  user: User;
  constructor(private httpclient: HttpClient, private router: Router) { }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  IsSuperAdmin() {
    return localStorage.getItem('roles') == 'SuperAdmin';
  }
  IsAdmin() {
    return localStorage.getItem('roles') == 'Admin';
  }
  IsPMO() {
    return localStorage.getItem('roles') == 'PMO';
  }
  IsPM() {
    return localStorage.getItem('roles') == 'PM';
  }
  IsTL() {
    return localStorage.getItem('roles') == 'TL';
  }
  IsEmployee() {
    return localStorage.getItem('roles') == 'Employee';
  }
  IsClient() {
    return localStorage.getItem('roles') == 'Client';
  }

  changPassword(NewPassword: string) {
    var Oldpass=localStorage.getItem("OldPassword")

    var data = {
      userName: localStorage.getItem('userName'),
      
      // email:localStorage.getItem("email"),
      password: Oldpass,
      Newpassword: NewPassword
    };


    return this.httpclient.post(`${environment.User}/Authenticate/changPassword`, data, this.httpOptions)
  }
}
