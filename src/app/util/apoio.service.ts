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
  user: any = null;

  constructor(private http: HttpClient) { }

  stringParaData(data: string){
    return moment(data).toDate();
  }

  formatarDataStringPtBr(data: any) {
    data = moment(data).toDate()
    return moment(data).format("DD/MM/YYYY");
  }

  setUserStorage(user: any) {
    this.user = JSON.stringify(user);
    localStorage.setItem("user", this.user);
  }

  getUserStorage() {
    let user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  removeUserStorage() {
    this.user = null;
    localStorage.removeItem("user");
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
