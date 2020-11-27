import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { User, UserDTO } from 'src/app/util/model';
@Component({
  selector: 'app-usuario-grid',
  templateUrl: './usuario-grid.component.html',
  styleUrls: ['./usuario-grid.component.css']
})
export class UsuarioGridComponent implements OnInit {

  usuarios: any[] = [];
  selected = new FormControl(0);
  titleDisplay: string = "Inserir";
  userDTO = new UserDTO();
  displaySpinner: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) {
    this.getAll();
  }

  ngOnInit(): void { }

  getRetornoFormPessoa(retorno: boolean) {
    if (retorno) {
      this.getAll();
    }
    this.selected.setValue(0);
  }

  setUsuario() {
    this.userDTO = new UserDTO();
    this.titleDisplay = "Inserir";
    this.selected.setValue(1);
  }

  getUsuario(id: string) {
    this.userDTO = new UserDTO();
    this.titleDisplay = "Edição";
    this.getById(id);
  }

  getById(id: string) {
    this.displaySpinner = true;
    this.db.collection('user').doc(id).get()
      .toPromise()
      .then((resp: any) => {
        if (resp.exists) {
          this.userDTO.id = resp.id;
          this.userDTO.user = resp.data();
          this.selected.setValue(1);
        } else {
          this.toastyService.showWarn("Usuário não encontrado!");
        }
        this.displaySpinner = false;
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao buscar usuário!");
      });
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
}
