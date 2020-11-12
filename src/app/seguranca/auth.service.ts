import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ApoioService } from '../util/apoio.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../util/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  userAuth: any = null;
  displaySpinnerLogin: boolean = false;

  constructor(
    public apoio: ApoioService,
    private router: Router,
    public auth: AngularFireAuth,
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) {}

  login(email: string, senha: string) {
    this.displaySpinnerLogin = true;
    this.db.collection('user', ref => ref.where('email', '==', email)).get()
      .subscribe((snapshot) => {
        let data = null;
        snapshot.forEach((doc) => {
          data = {
            'id': doc.id,
            'data': doc.data()
          }
        });
        if (data != null) {
          if (data.data.senha != "") {
            if (data.data.senha == senha) {
              this.router.navigate(['']);
              this.user = data.data;
            } else {
              this.toastyService.showError("Usuário e/ou senha incorreto!");
            }
          }
        } else {
          this.toastyService.showError("Usuário e/ou senha incorreto!");
        }
      })
    this.displaySpinnerLogin = false;
  }

  loginProvider(provider: any, nomeProvider: string) {
    this.displaySpinnerLogin = true;
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        this.getUserAuth(nomeProvider);
      }).catch(error => {
        console.log(error);
        if (error?.email != null) {
          this.toastyService.showWarn("E-mail já cadastrado com outro provedor!");
        } else {
          this.toastyService.showError("Erro ao efetuar login!");
        }
      });
    this.displaySpinnerLogin = false;
  }

  loginGoogle() {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    this.loginProvider(googleProvider, "GOOGLE");
  }

  loginFacebook() {
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.loginProvider(facebookProvider, "FACEBOOK");
  }

  // loginTwitter() {
  //   var twitterProvider = new firebase.auth.TwitterAuthProvider();
  //   this.loginProvider(twitterProvider);
  // }

  // loginGit() {
  //   var githubProvider = new firebase.auth.GithubAuthProvider();
  //   this.loginProvider(githubProvider, "GIT");
  // }

  getUserAuth(provider: string) {
    let coluna, colunaValor: string;
    this.auth.authState.subscribe(resp => {
      if (resp != null) {
        if (resp.email != null && resp.email != "") {
          coluna = 'email';
          colunaValor = resp.email;
          this.userAuth = resp;
          this.getUserAuthWhere(coluna, colunaValor, provider);
        }
        this.router.navigate(['']);
      }
    })
  }

  getUserAuthWhere(coluna: string, valor: string, provider: string) {
    let data: any = null;
    this.db.collection('user', ref => ref.where(coluna, '==', valor)).get()
      .subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          let dataResp = {
            'id': doc.id,
            'data': doc.data()
          }
          data = dataResp;
        });
      });
    if (data == null) {
      this.gerarUsuarioAutenticado(this.userAuth, provider);
    } else {
      this.user = data.data;
    }
  }

  gerarUsuarioAutenticado(user: any, provider: string) {
    this.user = this.montarObjetoNovoUsuarioComUsuarioAuth(user, provider);
  }

  montarObjetoNovoUsuarioComUsuarioAuth(user: any, provider: string) {
    let usuario = new Usuario();
    usuario.photoUrl = user.photoURL;
    usuario.id = user.uid;
    usuario.nome = user.displayName;
    usuario.email = user.email;
    usuario.provedor = provider;
    return usuario;
  }

  loggout() {
    this.auth.signOut()
      .then(resp => {
        this.apoio.removeUserStorage();
        this.user = null;
        this.toastyService.showSuccess("Loggout efetuado!");
        this.router.navigate(['']);
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao efetuar loggout");
      });
  }
}
