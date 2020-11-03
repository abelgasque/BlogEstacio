import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa } from 'src/app/util/model';
import { ToastyService } from '../toasty/toasty.service';
import firebase from 'firebase/app';

export class CategoriaDTO {
  categoria: any;
  subcategorias: any[] = [];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  displaySidebar: boolean = false;
  displaySpinner: boolean = false;
  menu: TreeNode[] = [];
  pessoa: any = null;
  pathImgPessoa = "../../../../assets/img/pessoas_perfil/";
  isAdministrador: boolean = false;
  userData: any;

  constructor(
    private authService: AuthService,
    public apoio: ApoioService,
    private router: Router,
    private toastyService: ToastyService,
    public auth: AngularFireAuth
  ) { 
    this.auth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  ngOnInit(): void {
    this.setPessoa();
  }

  setPessoa() {
    let pessoa = JSON.parse(localStorage.getItem('user'));
    if (pessoa != null) {
      this.pessoa = pessoa;
    }
    this.isAdmin();
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.setPessoa();
  }

  loggout() {
    this.auth.signOut();
    this.setPessoa();
    this.toastyService.showSuccess("Loggout efetuado com sucesso!");
  }
  
  isAdmin() {
    if (this.pessoa != null && this.pessoa.tipo_pessoa == "ADMINISTRADOR") {
      this.isAdministrador = true;
    } else {
      this.isAdministrador = false;
    }
  }
}
