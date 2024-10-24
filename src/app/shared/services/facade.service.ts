import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FacadeService {

  /**
   * Construtor da classe.
   * @param http Serviço de HTTP.
   */
  constructor(
    private readonly http: HttpClient
  ) { }

  /**
   * Retorna os itens da lista.
   * @returns Retorna a lista.
   */
  getList(): Observable<any> {
    return this.http.get('/api');
  }
  /**
   * Retorna os itens da lista.
   * @returns Retorna o item da lista através do ID.
   */
  get(id: string): Observable<any> {
    return this.http.get(`/api/${id}`);
  }
  /**
   * Retorna os itens da lista.
   * @returns Adiciona um item a lista.
   */
  set(data: any): Observable<any> {
    return this.http.post('/api', data);
  }
  /**
   * Retorna os itens da lista.
   * @returns retorna o item a ser atualizado através do ID.
   */
  update(id: string, body: any): Observable<any> {
    return this.http.put(`/api/${id}`, body);
  }
  /**
   * Deleta um item da lista.
   * @returns Retorna o item a ser deletado através do ID.
   */
  delete(id: string): Observable<any> {
    return this.http.delete(`/api/${id}`);
  }

}
