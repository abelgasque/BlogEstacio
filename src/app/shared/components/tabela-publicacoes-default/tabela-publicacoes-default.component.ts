import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-tabela-publicacoes-default',
  templateUrl: './tabela-publicacoes-default.component.html',
  styleUrls: ['./tabela-publicacoes-default.component.css']
})
export class TabelaPublicacoesDefaultComponent implements OnInit {

  @Input() publicacoes: any[] =[];
  @Input() isFooter :boolean = false;

  constructor() { }

  ngOnInit() {
    AOS.init();
  }
}
