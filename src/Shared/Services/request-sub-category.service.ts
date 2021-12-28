import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestSubCategory } from "../Models/requestSubCategory";
@Injectable({
  providedIn: 'root'
})
export class RequestSubCategoryService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllSubCategorys(): Observable<requestSubCategory[]> {
    return this.httpClient.get<requestSubCategory[]>(`${environment.requestSubCategory}`, this.httpHeader);
  }
  inserSubCategory(requestSubCategory: requestSubCategory): Observable<any> {
    return this.httpClient.post<any>(`${environment.requestSubCategory}`, requestSubCategory, this.httpHeader);
  }
  DeleteSubCategory(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.requestSubCategory}${id}`,this.httpHeader);
  }
}
