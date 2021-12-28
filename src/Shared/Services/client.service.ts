import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { client } from '../Models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  GetAllClients(): Observable <client[]>{
    return this.httpClient.get<client[]> (`${environment.clients}`,this.httpHeader) ;
  }
  inserClient(client:client): Observable <any>{
    return this.httpClient.post<any> (`${environment.clients}`,client,this.httpHeader) ;
  }
  GetclientByID(id: number): Observable<client> {
    return this.httpClient.get<client>(`${environment.clients}${id}`, this.httpHeader);
  }
  Updateclient(id:Number,client:client):Observable<client>{
    return this.httpClient.put<client>(`${environment.clients}`+ id,client,this.httpHeader);
  }
  Deleteclient(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.clients}${id}`,this.httpHeader);
  }
  GetClientsByEmployeeId(Empid:number):Observable<any>{ 
    return this.httpClient.get<any>(`${environment.GetClientsByEmployeeId}${Empid}`,this.httpHeader);
  }
}
