import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { UserDTO } from './model';

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

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    private router: Router,
    private toastyService: ToastyService
  ) { }

  formatTimestampToDate(data: any) {
    data = data.toDate();
    return moment(data).format("DD/MM/YYYY");
  }

  formatTimestampToDateEn(data: any) {
    data = data.toDate();
    return moment(data).format("YYYY-MM-DD");
  }

  formatToDateEn(data: any) {
    return moment(data).format("YYYY-MM-DD");
  }

  formatToDatePtBr(data: any) {
    return moment(data).format("DD/MM/YYYY");
  }

  stringParaData(data: string) {
    return moment(data).toDate();
  }

  formatarDataStringPtBr(data: any) {
    data = moment(data).toDate();
    return moment(data).format("DD/MM/YYYY");
  }

  getUserAccount(id: string) {
    this.db.collection('user').doc(id).get()
      .toPromise()
      .then((resp: any) => {
        if (resp.exists) {
          let data: any = {
            'user': resp.data(),
            'id': resp.id
          }
          if (data.user.dtBirth) {
            data.user.dtBirth = data.user.dtBirth.toDate();
          }
          this.getUserAuthStorage(data);
          this.router.navigate(['/user-account', 'default']);
        } else {
          this.toastyService.showWarn("Usuário não encontrado!");
        }
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao buscar usuário!");
      });
  }

  getUserAuthStorage(user: any) {
    user = JSON.stringify(user);
    localStorage.setItem("user", user);
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
