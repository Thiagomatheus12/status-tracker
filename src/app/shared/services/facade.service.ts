import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FacadeService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getList(): Observable<any> {
    return this.http.get('/api');
  }

  get(id: string): Observable<any> {
    return this.http.get(`/api/${id}`);
  }

  set(data: any): Observable<any> {
    return this.http.post('/api', data);
  }

  update(id: string, body: any): Observable<any> {
    return this.http.put(`/api/${id}`, body);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`/api/${id}`);
  }

}
