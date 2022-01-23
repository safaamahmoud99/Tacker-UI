import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResetPasswordDTO } from '../Models/ResetPasswordDTO';
import { ForgotPassword } from '../Models/ForgotPassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public userName: string;
    private userRoles = new BehaviorSubject<string>(localStorage.getItem('UserRoles'));
    // public  isLogged : boolean  = GlobalConstants.isLogged; // costom GlobalConstants
    AccessToken: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
    })
  };
  user: User;
  constructor(private httpclient: HttpClient, private router: Router) {
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
    //this.currentUser = this.currentUserSubject.asObservable();
    
   }
   public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
    this.currentUser = this.currentUserSubject.asObservable();  
    return this.currentUserSubject.value;
}
// login(user: User) {
//   //  this.email=user.email;
//   //  this.password=user.password;
//   //let Data={email,password}
//   localStorage.setItem("OldPassword", user.password)
//   // console.log("old", localStorage.getItem("OldPassword"))
//   var data = "email=" + user.email + "&password=" + user.password + "&grant_type=password";
//   console.log("useruseruseruser",user)
//   return this.httpclient.post<any>(`${environment.Domain}/Authenticate/login`, user, this.httpOptions).pipe(
//     map(user=>{
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       this.userName=user.email;
//       localStorage.setItem('userId', JSON.stringify(user.id));
//       localStorage.setItem('UserName', JSON.stringify(user.email));
//       localStorage.setItem('UserRoles', JSON.stringify(user.role));
//       localStorage.setItem('token', JSON.stringify(user.getToken));
//      // localStorage.setItem('token', JSON.stringify(user.));

//       this.currentUserSubject.next(user);

//       return user;
//       // store user details and jwt token in local storage to keep user logged in between page refreshes
//       //localStorage.setItem('currentUser', JSON.stringify({  ticket: data }));

//   }));
// }
loggedIn() {
  return localStorage.getItem('token');
}
isAuthorized(allowedRoles: string[]): boolean {
  //////debuger;
  const Userroles = JSON.parse(localStorage.getItem('UserRoles'));
  if (allowedRoles!== undefined) {
      const found = allowedRoles.some(r => Userroles.includes(r));
      return found;
  }

  return true;
}


getToken() {
  //////debuger;
  const currentUser = JSON.parse(localStorage.getItem('User') || '{}');
  if (currentUser) {
      return currentUser.access_token;
  }
  return JSON.parse(localStorage.getItem('token') || '{}');

}
public forgotPassword = (route: string, body: ForgotPassword) => {
  return this.httpclient.post(this.createCompleteRoute(route, environment.urlAddress), body);
}
public resetPassword = (route: string, body: ResetPasswordDTO) => {
  return this.httpclient.post(this.createCompleteRoute(route, environment.urlAddress), body);
}
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('User')

    localStorage.removeItem("clientId")
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("roles")
    localStorage.removeItem("userName");
    localStorage.removeItem("id");
    localStorage.removeItem("loginedUserId");

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
