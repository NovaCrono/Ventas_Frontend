import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from 'src/app/Modelo/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  Url = environment.Backend_Url;

  constructor(private http: HttpClient) { }

  showInfo(): Observable<any>{
    return this.http.get<any[]>(this.Url+'/items');
  }

  createInfo(item: Item): Observable<any>{
    return this.http.post<any[]>(this.Url+'/items', item);
  }
}
