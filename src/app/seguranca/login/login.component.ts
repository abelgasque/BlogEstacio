import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { AuthService } from '../auth.service';

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
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.login(this.usuario.email, this.usuario.senha);
  }
}
