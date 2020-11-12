import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa, Usuario } from 'src/app/util/model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  @Input() usuario: Usuario;
  @Input() isSituacao: boolean = false;
  @Input() isTipo: boolean = false;
  @Output() retornoPersistencia = new EventEmitter<boolean>();
  @Output() displayForm = new EventEmitter<boolean>();
  tipos = [
    { label: 'Selecione', value: null },
    { label: 'Administrador', value: 'ADMINISTRADOR' },
    { label: 'Coordenador', value: 'COORDENADOR' },
    { label: 'Professor', value: 'PROFESSOR' },
    { label: 'Aluno', value: 'ALUNO' }
  ];
  generos = [
    { label: 'Selecione', value: null },
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' }
  ];
  situacoes = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ];
  enderecos: any[] = [];
  displayImages: boolean = false;
  displaySpinner: boolean = false;
  imagemSelecionada: any;
  pathImgPessoaPerfil = "./../../../assets/img/pessoas_perfil/";

  constructor(
    private toasty: ToastyService,
    private db: AngularFirestore,
    private apoioService: ApoioService
  ) { }

  ngOnInit(): void { }

  cancelar() {
    this.retornoPersistencia.emit(false);
  }

  gerenciarPersistencia() {
    if (this.usuario.id == "") {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.db.collection("user").add(Object.assign({}, this.usuario))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toasty.showSuccess("Usuario criada");
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao criar!");
      });
  }

  update() {
    this.db.collection("user").doc(this.usuario.id).update(Object.assign({}, this.usuario))
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
    this.displaySpinner = true;
    this.apoioService.getWebServiceCorreioBuscarPorCep(cep)
      .then(response => {
        if (response != null) {
          if (response?.erro == true) {
            this.usuario.uf = "";
            this.usuario.cidade = "";
            this.usuario.bairro = "";
            this.usuario.logradouro = "";
            this.toasty.showWarn("CEP inexistente!");
          } else {
            this.usuario.uf = response.uf;
            this.usuario.cidade = response.localidade;
            this.usuario.bairro = response.bairro;
            this.usuario.logradouro = response.logradouro;
          }
        }
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.displaySpinner = false;
        this.toasty.showError("Erro ao buscar cep!");
      });
  }

}
