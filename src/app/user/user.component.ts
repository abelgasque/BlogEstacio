import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { UserDTO } from '../core/model';
import { ApoioService } from '../core/apoio.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  display: boolean = false;
  usuarios: any[] = [];
  titleDisplay: string = "Inserir";
  userDTO = new UserDTO();
  displaySpinner: boolean = false;

  constructor(
    private toastyService: ToastyService,
    private db: AngularFirestore,
    public apoioService: ApoioService
  ) {
    this.getAll();
  }

  ngOnInit(): void { }

  getRetornoFormPessoa(retorno: boolean) {
    if (retorno) {
      this.getAll();
    }
    this.display = false;
  }

  setUsuario() {
    this.userDTO = new UserDTO();
    this.titleDisplay = "Inserir";
    this.display = true;
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
          let data: any = {
            'user': resp.data(),
            'id': resp.id
          }
          if (data.user.dtBirth) {
            data.user.dtBirth = data.user.dtBirth.toDate();
          }
          this.userDTO = data;
          this.display = true;

        } else {
          this.toastyService.showWarn("Usuário não encontrado!");
        }
        this.displaySpinner = false;
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao buscar usuário!");
        this.displaySpinner = false;
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
