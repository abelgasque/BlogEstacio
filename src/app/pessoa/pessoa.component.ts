import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { Pessoa } from '../util/model';
import { PessoaService } from './pessoa.service';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas: any[] = [];
  selected = new FormControl(0);
  titleDisplay: string = "Inserir";
  pessoa = new Pessoa();
  displaySpinner: boolean = false;

  constructor(
    private pessoaService: PessoaService,
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

  novaPessoa() {
    this.pessoa = new Pessoa();
    this.titleDisplay = "Inserir";
    this.selected.setValue(1);
  }

  getPessoa(id: string) {
    this.db.collection('pessoa').doc(id).get()
      .toPromise()
      .then(resp => {
        if (resp.exists) {
          this.setPessoa(resp.data(), resp.id);
        }
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao buscar pessoa");
      });
  }

  setPessoa(pessoa: any, id: string) {
    if (pessoa) {
      this.pessoa.id_pessoa = id;
      this.montarObjeto(pessoa);
      this.titleDisplay = "Edição";
      this.selected.setValue(1);
      this.displaySpinner = true;
    }
  }

  montarObjeto(resp: any) {
    if (resp?.nome) {
      this.pessoa.nome = resp.nome;
    }
    if (resp?.tipo_pessoa) {
      this.pessoa.tipo_pessoa = resp.tipo_pessoa;
    }
  }

  getAll() {
    this.displaySpinner = true;
    this.pessoas = [];
    let lista: any[] = [];
    this.db.collection("pessoa").get()
      .toPromise()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let data = {
            'id': doc.id,
            "data": doc.data()
          }
          lista.push(data);
        });
      });
    this.pessoas = lista;
    this.displaySpinner = false;
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir pessoa?',
      accept: () => {

      }
    });
  }
}
