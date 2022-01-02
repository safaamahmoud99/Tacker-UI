import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Suppliers } from '../Models/Suppliers';
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };
  GetAllSuppliers(): Observable<Suppliers[]> {
    return this.httpClient.get<Suppliers[]>(`${environment.Suppliers}`, this.httpHeader);
  }
  insertSupplier(Suppliers: Suppliers): Observable<Suppliers> {
    return this.httpClient.post<Suppliers>(`${environment.Suppliers}`, Suppliers, this.httpHeader);
  }
  deleteSupplier(id: number): Observable<Suppliers> {
    return this.httpClient.delete<Suppliers>(`${environment.Suppliers}/` + id, this.httpHeader);
  }
  // deleteOrigin(id:Origins):Observable<any>{ 
  //  return this.httpClient.delete<any>(`${environment.Origins}${id}`,this.httpHeader);
 // }
  updateSupplier(id: Number, Supplier: Suppliers): Observable<Suppliers> {
    return this.httpClient.put<Suppliers>(`${environment.Suppliers}/` + id, Supplier, this.httpHeader);
  }
  GetSupplierById(SuppliersID: number): Observable<Suppliers> {
    return this.httpClient.get<Suppliers>(`${environment.Suppliers}/` + SuppliersID, this.httpHeader)
  }
}