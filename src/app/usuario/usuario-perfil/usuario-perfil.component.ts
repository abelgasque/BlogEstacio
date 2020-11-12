import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { Usuario } from 'src/app/util/model';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  usuario = new Usuario();
  displaySpinner: boolean = false;
  displayForm: boolean = false;

  constructor(
    public auth: AuthService,
    private db: AngularFirestore,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario() {
    this.displaySpinner = true;
    if (this.auth.user != null) {
      if (this.auth.user.email != null) {
        this.getUsuarioByEmail(this.auth.user.email);
      }
    }
  }

  getUsuarioByEmail(email: string) {
    let resp: any = null;
    this.db.collection('user', ref => ref.where('email', '==', email)).get()
      .subscribe((snapshot) => {
        snapshot.forEach(doc => {
          resp = doc.data();
        });
      })
    this.setUser(resp);
  }

  setUser(user: any) {
    console.log(user);
    if (user != null) {
      this.usuario = user;
    } else {
      this.usuario = this.auth.user;
    }
    this.displaySpinner = false;
  }
}
