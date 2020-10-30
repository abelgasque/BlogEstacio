import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
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
  images = [
    { title: 'foto-usuario-001.jpg' },
    { title: 'foto-usuario-002.jpg' },
    { title: 'foto-usuario-003.jpg' },
    { title: 'foto-usuario-004.jpg' },
    { title: 'foto-usuario-005.jpg' },
    { title: 'foto-usuario-006.jpg' },
    { title: 'foto-usuario-007.jpg' },
    { title: 'foto-usuario-008.jpg' },
    { title: 'foto-usuario-009.jpg' },
    { title: 'foto-usuario-010.jpg' },
  ];
  displayImages: boolean = false;
  imagemSelecionada: any;
  pathImgPessoaPerfil = "./../../../assets/img/pessoas_perfil/";

  constructor(
    private pessoaService: PessoaService,
    private toastyService: ToastyService
  ) { }

  ngOnInit(): void { }

  cancelar() {
    this.retornoPersistencia.emit(false);
  }

  gerenciarPersistencia(f: NgForm) {
    if (this.pessoa.id_pessoa > 0) {
      this.alterar();
    } else {
      this.incluir();
    }
  }

  getImg() {
    this.displayImages = true;
  }

  setImg() {
    this.displayImages = false;
    this.pessoa.img_pessoa = this.imagemSelecionada.title;
    this.displayForm.emit(true);
  }

  incluir() {
    this.pessoa.img_pessoa = "foto-usuario-010.jpg";
    this.pessoa.img_fundo = "foto-usuario-010.jpg";
    this.pessoaService.incluir(this.pessoa)
      .then(response => {
        this.retornoPersistencia.emit(true);
        this.toastyService.showSuccess("Pessoa adicionada com sucesso!");
      })
      .catch(response => {
        this.retornoPersistencia.emit(false);
        console.log(response);
        this.toastyService.showError("Erro ao adicionar pessoa!");
      });
  }

  alterar() {
    this.pessoaService.alterar(this.pessoa.id_pessoa, this.pessoa)
      .then(response => {
        this.retornoPersistencia.emit(true);
        this.toastyService.showSuccess("Pessoa alterada com sucesso!");
      })
      .catch(response => {
        this.retornoPersistencia.emit(false);
        console.log(response);
        this.toastyService.showError("Erro ao alterar pessoa!");
      });
  }

  getEnderecoPorCep(cep: string) {

  }
}
