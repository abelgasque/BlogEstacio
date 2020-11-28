import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { UserDTO } from 'src/app/util/model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() displayForm: boolean = false;
  @Input() userDTO: UserDTO;
  @Input() isType: boolean = false;
  @Input() isActive: boolean = false;
  @Input() isUpdate: boolean = false;
  @Output() retornoPersistencia = new EventEmitter<boolean>();
  tipos = [
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Coordenador', value: 'COORDENADOR' },
    { label: 'Professor', value: 'PROFESSOR' },
    { label: 'Aluno', value: 'ALUNO' }
  ];
  generos = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' }
  ];
  displaySpinner: boolean = false;

  constructor(
    private toasty: ToastyService,
    private db: AngularFirestore,
    public apoioService: ApoioService
  ) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.retornoPersistencia.emit(false);
  }

  gerenciarPersistencia() {
    if (this.userDTO.id == null) {
      this.insert();
    } else {
      this.update();
    }
  }

  insert() {
    this.db.collection("user").add(Object.assign({}, this.userDTO))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toasty.showSuccess("Usuario inserido com sucesso!");
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao inserir usuário!");
      });
  }

  update() {
    this.db.collection("user").doc(this.userDTO.id).update(Object.assign({}, this.userDTO.user))
      .then((resp: any) => {
        this.toasty.showSuccess("Usuario atualizada");
        this.retornoPersistencia.emit(true);
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao atualizada!");
      });
  }

  getEnderecoPorCep(cep: string) {
    cep = cep.replace('-', '');
    if (cep.length == 8) {
      this.displaySpinner = true;
      this.apoioService.getWebServiceCorreioBuscarPorCep(cep)
        .then(response => {
          if (response != null) {
            if (response?.erro == true) {
              this.userDTO.user.stateCode = "";
              this.userDTO.user.city = "";
              this.userDTO.user.neighborhood = "";
              this.userDTO.user.publicPlace = "";
              this.toasty.showWarn("CEP não existente!");
            } else {
              this.userDTO.user.stateCode = response.uf;
              this.userDTO.user.city = response.localidade;
              this.userDTO.user.neighborhood = response.bairro;
              this.userDTO.user.publicPlace = response.logradouro;
            }
          }
          this.displaySpinner = false;
        })
        .catch(erro => {
          console.log(erro);
          this.displaySpinner = false;
          this.toasty.showError("Erro ao buscar cep!");
        });
    } else {
      this.toasty.showWarn("Insira um CEP válido!");
    }
  }
}
