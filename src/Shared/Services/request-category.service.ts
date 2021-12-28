import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestCategory } from "../Models/requestCategory";

@Injectable({
  providedIn: 'root'
})
export class RequestCategoryService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllCategory(): Observable<requestCategory[]> {
    return this.httpClient.get<requestCategory[]>(`${environment.requestCategory}`, this.httpHeader);
  }
  inserCategory(requestCategory:requestCategory): Observable <any>{
    return this.httpClient.post<any> (`${environment.requestCategory}`,requestCategory,this.httpHeader) ;
  }
  DeleteCategory(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.requestCategory}${id}`,this.httpHeader);
  }
}
