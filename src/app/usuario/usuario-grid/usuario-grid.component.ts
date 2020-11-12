import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { Usuario } from 'src/app/util/model';
@Component({
  selector: 'app-usuario-grid',
  templateUrl: './usuario-grid.component.html',
  styleUrls: ['./usuario-grid.component.css']
})
export class UsuarioGridComponent implements OnInit {

  usuarios: any[] = [];
  selected = new FormControl(0);
  titleDisplay: string = "Inserir";
  usuario = new Usuario();
  displaySpinner: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getRetornoFormPessoa(retorno: boolean) {
    if (retorno) {
      this.getAll();
    }
    this.selected.setValue(0);
  }

  setUsuario() {
    this.usuario = new Usuario();
    this.titleDisplay = "Inserir";
    this.selected.setValue(1);
  }

  getUsuario(id: string) {
    this.usuario = new Usuario();
    this.titleDisplay = "Edição";
    this.getById(id);
  }

  getById(id: string) {
    this.displaySpinner = true;
    this.db.collection('user').doc(id).valueChanges().subscribe((resp: any) => {
      if (resp?.id == null) {
        resp.id = id;
      }
      this.usuario = this.montarObjetoUsuario(resp);
      this.selected.setValue(1);
    })
    this.displaySpinner = false
  }

  getAll() {
    this.displaySpinner = true;
    this.usuarios = [];
    let lista: any[] = [];
    this.db.collection('user').get()
      .toPromise()
      .then(resp => {
        resp.forEach(doc => {
          let data = {
            'id': doc.id,
            'data': doc.data()
          }
          lista.push(data);
        });
      });
    this.usuarios = lista;
    this.displaySpinner = false;
  }

  montarObjetoUsuario(resp: any) {
    let usuario = new Usuario();
    usuario.nome = resp.nome;
    usuario.tipo = resp.tipo;
    return usuario;
  }
}
