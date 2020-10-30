import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pessoa } from 'src/app/util/model';

@Component({
  selector: 'app-seguranca-pessoa',
  templateUrl: './seguranca-pessoa.component.html',
  styleUrls: ['./seguranca-pessoa.component.css']
})
export class SegurancaPessoaComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getRetornoPersistencia(retorno: boolean){
    if(retorno==true){
      this.router.navigate(['/seguranca/login']);
    }
  }
}
