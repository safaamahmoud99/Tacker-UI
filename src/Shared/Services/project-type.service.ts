import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { project } from '../Models/project'
import { projectType } from '../Models/projectType';


@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };

  GetAllProjectTypes(): Observable<projectType[]> {
    return this.httpClient.get<projectType[]>(`${environment.projectTypes}`, this.httpHeader);
  }
  AddprojectType(dep:projectType): Observable <any>{
    return this.httpClient.post<any> (`${environment.projectTypes}`,dep,this.httpHeader) ;
  }
  GetprojectTypeByID(id: number): Observable<projectType> {
    return this.httpClient.get<projectType>(`${environment.projectTypes}${id}`, this.httpHeader);
  }
  UpdateprojectType(id:Number,projectType:projectType):Observable<projectType>{
    return this.httpClient.put<projectType>(`${environment.projectTypes}`+ id,projectType,this.httpHeader);
  }
  DeleteprojectType(id:number):Observable<any>{ 
    return this.httpClient.delete<any>(`${environment.projectTypes}${id}`,this.httpHeader);
  }
}