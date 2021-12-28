import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { client } from '../Models/client';
import { employee } from '../Models/employee';
import { map, filter, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllEmployees(): Observable<employee[]> {
    return this.httpClient.get<employee[]>(`${environment.employees}`, this.httpHeader);
  }
  getEmpByID(id: number): Observable<employee> {
    return this.httpClient.get<employee>(`${environment.employees}${id}`, this.httpHeader);
  }
  GetImageByName(imageName: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.getImageByName}${imageName}`, this.httpHeader);
  }
  GetEmployeeByDepartmentId(deprtmentId): Observable<any> {
    return this.httpClient.get<any>(`${environment.GetEmployeeByDepartmentId}${deprtmentId}`, this.httpHeader);
  }
  AddEmployee(emp: employee) {
    //console.log(emp);
    const httpHeader = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Accept': '*/*'

      })
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //"Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpClient.post(`${environment.employees}`, emp, httpOptions);
  }
  UpdateEmployee(id, emp) {
    //console.log(emp);
    const httpHeader = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Accept': '*/*'

      })
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpClient.put(`${environment.employees}` + id, emp, httpHeader);
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = `${environment.employees}api/dashboard/UploadImage`;
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient
      .post(endpoint, formData).pipe(
        map(() => { return true; }));
  }

  delete(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // "Authorization": "bearer " + localStorage.getItem('token')
      })
    };
    return this.httpClient.delete(`${environment.employees}` + id, this.httpHeader);
  }
}
