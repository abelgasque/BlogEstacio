import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa } from 'src/app/util/model';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  @Input() pessoa: Pessoa;
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
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private db: AngularFirestore,
    private apoioService: ApoioService
  ) { }

  ngOnInit(): void {

    console.log(this.pessoa.id_pessoa);
  }

  cancelar() {
    this.retornoPersistencia.emit(false);
  }

  gerenciarPersistencia() {
    if (this.pessoa.id_pessoa == "") {
      this.create();
    } else {
      this.update();
    }
  }

  async create() {
    return this.db.collection("pessoa").add(Object.assign({}, this.pessoa))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toastyService.showSuccess("Publicação inserida");
      })
      .catch(resp => {
        this.retornoPersistencia.emit(false);
        this.toastyService.showError("Erro ao criar!");
      });
  }

  async update() {
    return this.db.collection("pessoa").doc(this.pessoa.id_pessoa).set(Object.assign({}, this.pessoa))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toastyService.showSuccess("Atualizado com sucesso");
      })
      .catch(resp => {
        this.retornoPersistencia.emit(false);
        this.toastyService.showError("Erro ao atualizar!");
      });
  }

  getEnderecoPorCep(cep: string) {
    this.displaySpinner = true;
    this.apoioService.getWebServiceCorreioBuscarPorCep(cep)
      .then(response => {
        console.log(response)
        if (response != null) {
          if (response?.erro == true) {
            this.pessoa.uf = "";
            this.pessoa.cidade = "";
            this.pessoa.bairro = "";
            this.pessoa.logradouro = "";
            this.toastyService.showWarn("CEP inválido!");
          } else {
            this.pessoa.uf = response.uf;
            this.pessoa.cidade = response.localidade;
            this.pessoa.bairro = response.bairro;
            this.pessoa.logradouro = response.logradouro;
          }
        }
        this.displaySpinner = false;
      })
      .catch(erro => {
        console.log(erro);
        this.displaySpinner = false;
        this.toastyService.showError("Erro ao buscar cep!");
      });
  }
}
