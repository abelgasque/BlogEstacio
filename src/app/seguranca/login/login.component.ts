import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';

export class Usuario {
  email: string;
  senha: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  displaySpinner: boolean = false;
  userData: any;

  constructor(
    public apoio: ApoioService,
    private router: Router,
    private toastyService: ToastyService,
    private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }


  login() {

  }

  loginGoogle() {
    firebase.auth().languageCode = 'pt_BR';
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(resp => {
        this.setPessoa();
        this.toastyService.showSuccess("Login efetuado com sucesso");
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao fazer login pelo Google");
      });
  }

  loginFacebook() {
    firebase.auth().languageCode = 'pt_BR';
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(resp => {
        this.setPessoa();
        this.toastyService.showSuccess("Login efetuado com sucesso");
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao fazer login pelo Facebook");
      });
  }

  loginTwitter() {
    firebase.auth().languageCode = 'pt_BR';
    this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(resp => {
        this.setPessoa();
        this.toastyService.showSuccess("Login efetuado com sucesso");
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao fazer login pelo Twitter");
      });
  }

  setPessoa() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
    this.router.navigate(['']);
  }

}
