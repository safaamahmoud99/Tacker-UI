import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DueDateCategory } from '../Models/DueDateCategory';
@Injectable({
  providedIn: 'root'
})
export class DueDateCategoryService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllDueDateCategories(): Observable<DueDateCategory[]> {
    return this.httpClient.get<DueDateCategory[]>(`${environment.DueDateCategory}`, this.httpHeader);
  }
  insertDueDateCategory(DueDateCategory: DueDateCategory): Observable<DueDateCategory> {
    return this.httpClient.post<DueDateCategory>(`${environment.DueDateCategory}`, DueDateCategory, this.httpHeader);
  }
  deleteDueDateCategory(id: number): Observable<DueDateCategory> {
    return this.httpClient.delete<DueDateCategory>(`${environment.DueDateCategory}/` + id, this.httpHeader);
  }
  updateDueDateCategory(id: Number, DueDateCategory: DueDateCategory): Observable<DueDateCategory> {
    return this.httpClient.put<DueDateCategory>(`${environment.DueDateCategory}/` + id, DueDateCategory, this.httpHeader);
  }
  GetDueDateCategoryById(DueDateCategoryID: number): Observable<DueDateCategory> {
    return this.httpClient.get<DueDateCategory>(`${environment.DueDateCategory}/` + DueDateCategoryID, this.httpHeader)
  }
}