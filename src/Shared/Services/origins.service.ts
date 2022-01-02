import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Origins } from '../Models/Origins';
@Injectable({
  providedIn: 'root'
})
export class OriginsService {
  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  GetAllOrigins(): Observable <Origins[]>{
    return this.httpClient.get<Origins[]> (`${environment.Origins}`,this.httpHeader) ;
  }
  
  inserOrigin(client:Origins): Observable <any>{
    return this.httpClient.post<any> (`${environment.Origins}`,client,this.httpHeader) ;
  }
 
  deleteOrigin(id:number):Observable<Origins>{ 
    return this.httpClient.delete<Origins>(`${environment.Origins}/`+id,this.httpHeader);
  }
  
  updateOrigin(id:Number,Origin:Origins):Observable<Origins>{
    return this.httpClient.put<Origins>(`${environment.Origins}/`+ id,Origin,this.httpHeader);
  }
  
  GetOriginById(OriginsId: number): Observable<Origins> {
    return this.httpClient.get<Origins>(`${environment.Origins}/` +OriginsId, this.httpHeader)
  }
 
}
