import { Component, OnInit } from '@angular/core';
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
  titleDisplay: string = "Inserir";; 
  pessoa = new Pessoa();
  displaySpinner: boolean = false;
    
  constructor(
    private pessoaService: PessoaService,
    private confirmationService: ConfirmationService,
    private toastyService: ToastyService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getRetornoFormPessoa(retorno: boolean) {
    if (retorno == true) {
      this.selected.setValue(0);
      this.getAll();
    }else{
      this.selected.setValue(0);
    }
  }

  novaPessoa() {
    this.pessoa = new Pessoa();
    this.titleDisplay = "Inserir";
    this.selected.setValue(1);
  }

  getPessoa(id: number) {
    this.titleDisplay = "Edição";
    this.getById(id);
  }

  getById(id: number) {
    this.displaySpinner = true;
    this.pessoaService.getById(id)
      .then(response => {
        if (response != []) {
          this.pessoa = response[0];
          this.selected.setValue(1);
        }
        this.displaySpinner = false;
      })
      .catch(response => {
        console.log(response);
        this.toastyService.showError("Erro ao buscar pessoa");
      });
  }

  getAll() {
    this.displaySpinner = true;
    this.pessoas = [];
    this.pessoaService.getAll()
      .then(response => {
        if (response != null) {
          this.pessoas = response;
        }
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        this.toastyService.showError("Erro ao buscar pessoa");
        this.displaySpinner = false;
      });
  }

  confirmarExclusao(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir pessoa?',
      accept: () => {

      }
    });
  }
}
