import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ApoioService } from '../util/apoio.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserDTO } from '../util/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDTO = new UserDTO();
  displaySpinnerLogin: boolean = false;

  constructor(
    public apoio: ApoioService,
    private router: Router,
    public auth: AngularFireAuth,
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) {
    this.getUserAuth(null);
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
    this.userDTO = new UserDTO();
    this.auth.authState.subscribe(userAuth => {
      if (userAuth) {
        this.db.collection('user').doc(userAuth.uid).get()
          .toPromise()
          .then((response: any) => {
            if (response.exists) {
              this.userDTO.id = response.id;
              this.userDTO.user = response.data();
              if (this.router.url == '/security/login') {
                this.router.navigate(['']);
              }
            } else {
              this.insertUserAuth(userAuth, provider, userAuth.uid);
            }
          })
          .catch((error: any) => {
            console.log(error);
            this.toastyService.showError("Erro ao receber usuário autenticado");
          });
      }
    })
  }

  insertUserAuth(userAuth: any, provider: string, uid: string) {
    let userInsert = new User();
    userInsert.photoURL = userAuth.photoURL;
    userInsert.name = userAuth.displayName;
    userInsert.mail = userAuth.email;
    userInsert.provider = provider;
    this.db.collection("user").doc(uid).set(Object.assign({}, userInsert))
      .then(resp => {
        this.getUserAuth(null);
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao gerar usuário padrão");
      });
  }

  loggout() {
    this.auth.signOut()
      .then(resp => {
        this.apoio.removeUserStorage();
        this.userDTO = new UserDTO();
        this.toastyService.showSuccess("Sessão usuário encerrada!");
        this.router.navigate([''])
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao efetuar loggout");
      });
  }
}
