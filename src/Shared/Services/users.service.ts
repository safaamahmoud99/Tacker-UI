import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient:HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'
       
  })};

  getAllUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.User}/users`,this.httpHeader);
  }
  GetUnregisteredUsers():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.User}/users/GetUnregisteredUsers`,this.httpHeader);
  }
  GetUnregisteredUsersClient():Observable<User[]>
  {
    return this.httpClient.get<User[]>(`${environment.User}/users/GetUnregisteredUsersClient`,this.httpHeader);
  }
  addUser(NewUser:User)
  {
    return this.httpClient.post(`${environment.User}/Authenticate/register`,NewUser,this.httpHeader)
  }
  delete(id)
  {
    return this.httpClient.delete(`${environment.User}/users/`+id,this.httpHeader)
  }
}
