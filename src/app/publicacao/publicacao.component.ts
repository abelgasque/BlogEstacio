import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { ApoioService } from '../util/apoio.service';
import { Publicacao } from '../util/model';

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
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  retornoPersistenciaForm(event: boolean) {
    if (event) {
      this.getAll();
    }
    this.titleForm = "Incluir";
    this.selected.setValue(0);
  }

  getPublicacao(id: string) {
    this.publicacao = new Publicacao();
    this.titleForm = "Alterar";
    this.getById(id);
  }

  setPublicacao() {
    this.titleForm = "Incluir";
    this.publicacao = new Publicacao();
    this.selected.setValue(1);
  }

  getById(id: string) {
    this.displaySpinner = true;
    this.db.collection('publicacao').doc(id).valueChanges().subscribe((resp: any) => {
      if (resp?.id == null) {
        resp.id = id;
      }
      this.publicacao = this.apoioService.montarObjetoPublicacao(resp);
      this.selected.setValue(1);
    })
    this.displaySpinner = false
  }

  getAll() {
    this.displaySpinner = true;
    let publicacoes: any[] = [];
    this.db.collection('publicacao').get().subscribe((snapshot) => {
      snapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'data': doc.data()
        }
        publicacoes.push(data);
      });
    })
    this.publicacoes = publicacoes;
    this.displaySpinner = false;
  }
}
