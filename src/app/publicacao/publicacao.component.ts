import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { ApoioService } from '../util/apoio.service';
import { Publicacao } from '../util/model';
import { PublicacaoService } from './publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.css']
})
export class PublicacaoComponent implements OnInit {

  publicacao = new Publicacao();
  displaySpinner: boolean = false;
  publicacoes: any[] = [];
  selected = new FormControl(0);
  titleForm: string = "Incluir";

  constructor(
    public apoioService: ApoioService,
    private publicacaoService: PublicacaoService,
    private toastyService: ToastyService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  retornoPersistenciaForm(event: boolean){
    if(event){
      this.getAll();
    }
    this.selected.setValue(0);
  }

  getPublicacao(id: number) {
    this.publicacao = new Publicacao();
    this.titleForm = "Alterar";
    this.getById(id);
    
  }

  setPublicacao() {
    this.titleForm = "Incluir";
    this.publicacao = new Publicacao();
    this.selected.setValue(1);
  }

  getById(id: number){
    this.publicacaoService.getById(id)
    .then(resp => {
      if(resp != null || resp != []){
        resp[0].dt_publicacao = this.apoioService.stringParaData(resp[0].dt_publicacao );
        this.publicacao = resp[0];
        console.log(this.publicacao);
        this.selected.setValue(1);
      }
    })
    .catch(resp => {
      console.log(resp);
    });
  }

  getAll() {
    this.displaySpinner = true;
    this.publicacoes = [];
    this.publicacaoService.getAll()
      .then(response => {
        if (response != null) {
          this.publicacoes = response;
        }
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        this.toastyService.showError("Erro ao buscar pessoa");
        this.displaySpinner = false;
      });
  }

 
}
