import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { department } from "../Models/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {


  constructor(private httpClient : HttpClient) { }
  httpHeader={headers: new HttpHeaders({
    'content-type':'application/json',
    'Accept': '*/*'  
  })};
  GetAllDepartmens(): Observable <department[]>{
    return this.httpClient.get<department[]> (`${environment.department}`,this.httpHeader) ;
  }
  
  getDepartmentByEmpID(empID:number)
  {
    return this.httpClient.get<department>(`${environment.getDepartmentByEmpID}${empID}`,this.httpHeader) ;
  }
  inserDepartment(dep:department): Observable <any>{
    return this.httpClient.post<any> (`${environment.department}`,dep,this.httpHeader) ;
  }
  getDepartmentByID(id: number): Observable<department> {
    return this.httpClient.get<department>(`${environment.department}${id}`, this.httpHeader);
  }
  updateDepartment(id:Number,department:department):Observable<department>{
    return this.httpClient.put<department>(`${environment.department}`+ id,department,this.httpHeader);
  }
  deleteDepartment(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.department}${id}`,this.httpHeader);
  }

}
