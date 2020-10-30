import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApoioService {
  
  language: any = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  };
  pessoa: any = null;

  constructor(private http: HttpClient) { }

  stringParaData(data: string){
    return moment(data).toDate();
  }

  formatarDataStringPtBr(data: string) {
    return moment(data).format("DD/MM/YYYY");
  }

  setPessoaStorage(pessoa: any) {
    this.pessoa = JSON.stringify(pessoa);
    localStorage.setItem("pessoa", this.pessoa);
  }

  getPessoaStorage() {
    let pessoa = localStorage.getItem("pessoa");
    pessoa = JSON.parse(pessoa);
    return pessoa;
  }

  removePessoaStorage() {
    this.pessoa = null;
    localStorage.removeItem("pessoa");
  }

  getCalendarPtBr() {
    return this.language;
  }

  getWebServiceCorreioBuscarPorCep(cep: string): Promise<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .toPromise()
      .then(response => response)
      .catch(erro => {
        return Promise.reject(erro);
      });
  }
}
