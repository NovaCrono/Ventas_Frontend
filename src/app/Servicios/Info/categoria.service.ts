import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from 'src/app/Modelo/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  Url = environment.Backend_Url;

  constructor(private http: HttpClient) { }

  showInfo(): Observable<any>{
    return this.http.get<any[]>(this.Url+'/categorias');
  }

  createInfo(categoria: Categoria): Observable<any>{
    return this.http.post<any[]>(this.Url+'/categorias', categoria);
  }
}
