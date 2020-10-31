import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa } from 'src/app/util/model';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  senha: string;
  pessoa = new Pessoa();
  displaySpinner: boolean = false;
  userData:any;

  constructor(
    private apoioService: ApoioService,
    private toastyService: ToastyService,
    private router: Router,
    public auth: AngularFireAuth
  ) {
    
  }

  ngOnInit(): void { }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }

  validarForm(pessoa: any) {
    if (pessoa == undefined || pessoa == null || pessoa == []) {
      this.toastyService.showWarn("Pessoa não encontrada");
    } else {
      if (pessoa[0].situacao_pessoa == "INATIVO") {
        this.toastyService.showWarn("Usuario inátivo, entre em contato com administrador do sistema!");
      } else if (pessoa[0].senha != this.senha) {
        this.toastyService.showWarn("Senha incorreta!");
        this.senha = null;
      } else {
        this.apoioService.setPessoaStorage(pessoa[0]);
        this.router.navigate(['']);
      }
    }
  }
}
