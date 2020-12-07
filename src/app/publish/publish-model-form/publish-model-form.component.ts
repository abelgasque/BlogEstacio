import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/core/apoio.service';
import { PublishDTO } from 'src/app/core/model';

@Component({
  selector: 'app-publish-model-form',
  templateUrl: './publish-model-form.component.html',
  styleUrls: ['./publish-model-form.component.css']
})
export class PublishModelFormComponent implements OnInit {

  @Input() publishDTO: PublishDTO;
  @Input() isUpdate: boolean = false;
  @Input() isSelectUser: boolean = false;
  @Input() displayForm: boolean = false;
  @Output() retornoPersistencia = new EventEmitter<boolean>();
  users: any[] = [];
  tipos = [
    { label: 'Selecionar', value: null },
    { label: 'Duvida', value: 'DUVIDA' },
    { label: 'Argumento', value: 'ARGUMENTO' },
    { label: 'Outros', value: 'OUTROS' },
  ];

  constructor(
    public apoioService: ApoioService,
    private db: AngularFirestore,
    private toasty: ToastyService
  ) {
    this.getAllUsers();
  }

  ngOnInit(): void { }

  gerenciarPersistencia() {
    if (this.publishDTO.id == null) {
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    this.db.collection("publish").add(Object.assign({}, this.publishDTO.publish))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toasty.showSuccess("Publicação criada");
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao criar!");
      });
  }

  update() {
    this.db.collection("publish").doc(this.publishDTO.id).update(Object.assign({}, this.publishDTO.publish))
      .then((resp: any) => {
        this.toasty.showSuccess("Publicação atualizada");
        this.retornoPersistencia.emit(true);
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao atualizada!");
      });
  }

  getAllUsers() {
    let lista: any[] = [];
    this.users = [];
    this.db.collection('user').get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc: any) => {
          let data = {
            'id': doc.id,
            'name': doc.data().name,
            'photoURL': doc.data().photoURL
          }
          lista.push(data);
        })
        this.users = lista;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
