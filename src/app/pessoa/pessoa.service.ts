import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient, private db: AngularFirestore) { }

  incluir(entidade: any): Promise<any> {
    return this.http.post<any>(`/api/pessoa/inserir`, entidade).toPromise();
  }

  alterar(id: number, entidade: any): Promise<any> {
    return this.http.put<any>(`/api/pessoa/atualizar/${id}`, entidade).toPromise();
  }

  getById(id: string) {
    this.db.collection("pessoa").doc(id).get()
      .toPromise()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  getByCpf(cpf: string): Promise<any> {
    return this.http.get<any>(`/api/pessoa/getbycpf/${cpf}`)
      .toPromise()
      .then(response => response);
  }

  getAll() {

  }
}
