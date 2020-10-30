import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PessoaService } from 'src/app/pessoa/pessoa.service';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Pessoa } from 'src/app/util/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cpf: string;
  senha: string;
  pessoa = new Pessoa();
  displaySpinner: boolean =false;

  constructor(
    private apoioService: ApoioService,
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apoioService.removePessoaStorage();
  }

  login() {
    this.pessoaService.getByCpf(this.cpf)
      .then(resp => {
        this.validarForm(resp);
      })
      .catch(resp => {
        console.log(resp);
        this.toastyService.showError("Erro ao buscar pessoa por cpf");
      });
  }

  validarForm(pessoa: any) {
    if (pessoa == undefined || pessoa == null || pessoa == []) {
      this.toastyService.showWarn("Pessoa não encontrada");
    }else{
      if(pessoa[0].situacao_pessoa == "INATIVO"){
        this.toastyService.showWarn("Usuario inátivo, entre em contato com administrador do sistema!");
      }else if(pessoa[0].senha != this.senha){
        this.toastyService.showWarn("Senha incorreta!");
        this.senha = null;
      }else{
        this.apoioService.setPessoaStorage(pessoa[0]);
        this.router.navigate(['']);
      }
    }
  }
}
