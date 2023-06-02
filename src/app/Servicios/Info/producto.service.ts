import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/Modelo/Producto'; 

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  Url = environment.Backend_Url;

  constructor(private http: HttpClient) { }

  showInfo(): Observable<any>{
    return this.http.get<any[]>(this.Url+'/productos');
  }

  createInfo(producto: Producto): Observable<any>{
    return this.http.post<any[]>(this.Url+'/productos', producto);
  }
}
