import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  Url = environment.Backend_Url;

  constructor(private http: HttpClient) { }

  showInfo(): Observable<any>{
    return this.http.get<any[]>(this.Url+'/facturas');
  }

  createInfo(factura: any): Observable<any>{
    return this.http.post<any[]>(this.Url+'/facturas', factura);
  }

  deleteInfo(id: any){
    return this.http.delete<any[]>(this.Url+'/facturas/'+id);
  }

  showOneInfo(id: any): Observable<any>{
    return this.http.get<any[]>(this.Url+'/facturas/'+id);
  }

  editInfo(id: any, factura: any): Observable<any>{
    return this.http.put<any[]>(this.Url+'/facturas/'+id, factura);
  }
}
