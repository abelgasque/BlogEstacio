import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  constructor(private http: HttpClient) { }

  incluir(entidade: any): Promise<any> {
    return this.http.post<any>(`/api/publicacao/inserir`, entidade).toPromise();
  }

  alterar(id: number, entidade: any): Promise<any> {
    return this.http.put<any>(`/api/publicacao/atualizar/${id}`, entidade).toPromise();
  }

  getById(id: number): Promise<any> {
    return this.http.get<any>(`/api/publicacao/buscar/${id}`)
      .toPromise()
      .then(response => response);
  }

  getAll(): Promise<any> {
    return this.http.get<any>(`/api/publicacao/listar`)
      .toPromise()
      .then(response => response);
  }
}
