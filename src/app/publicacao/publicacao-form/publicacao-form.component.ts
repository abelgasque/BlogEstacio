import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { ApoioService } from 'src/app/util/apoio.service';
import { Publicacao } from 'src/app/util/model';

@Component({
  selector: 'app-publicacao-form',
  templateUrl: './publicacao-form.component.html',
  styleUrls: ['./publicacao-form.component.css']
})
export class PublicacaoFormComponent implements OnInit {

  @Input() publicacao: Publicacao;
  @Input() isSituacao: boolean = false;
  @Input() isTipo: boolean = false;
  @Output() retornoPersistencia = new EventEmitter<boolean>();
  @Output() displayForm = new EventEmitter<boolean>();
  pathImg: string = "../../../assets/img/publicacoes/";
  pessoas: any[] = [];
  tipos = [
    { label: 'Selecione', value: null },
    { label: 'Duvida', value: 'DUVIDA' },
    { label: 'Argumento', value: 'ARGUMENTO' },
  ];
  situacoes = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' }
  ]
  constructor(
    public apoio: ApoioService,
    private db: AngularFirestore,
    private toasty: ToastyService
  ) { }

  ngOnInit(): void {
    //this.getAllPessoas();
  }

  getImg() {

  }

  async create() {
    return this.db.collection("publicacao").add(Object.assign({}, this.publicacao))
      .then((resp) => {
        console.log(resp);
        this.retornoPersistencia.emit(true);
        this.toasty.showSuccess("Publicação inserida");
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao criar!");
      });
  }

  async update() {
    return this.db.collection("publicacao").doc("id").set(Object.assign({}, this.publicacao))
      .then((resp) => {
        console.log(resp);
        this.toasty.showSuccess("Publicação inserida");
      })
      .catch(resp => {
        console.log(resp);
        this.toasty.showError("Erro ao criar!");
      });
  }

  gerenciarPersistencia() {
    //   if(this.publicacao.id_publicacao>0){
    //     this.atualizar();
    //   }else{
    //     this.inserir();
    //   }
    //   f.resetForm();
  }

  // inserir(){
  //   console.log(this.publicacao.descricao)
  //   this.publicacaoService.incluir(this.publicacao)
  //   .then(resp=>{
  //     this.retornoPersistencia.emit(true);
  //     this.publicacao = new Publicacao();
  //     this.toastyService.showSuccess("Publicação inserida com sucesso!");
  //   })
  //   .catch(resp=>{
  //     console.log(resp);
  //     this.retornoPersistencia.emit(false);
  //     this.toastyService.showError("Erro ao inserir publicação");
  //   });
  // }

  // atualizar(){
  //   this.publicacaoService.alterar(this.publicacao.id_publicacao, this.publicacao)
  //   .then(resp=>{
  //     this.retornoPersistencia.emit(true);
  //     this.publicacao = new Publicacao();
  //     this.toastyService.showSuccess("Publicação atualizada com sucesso!");
  //   })
  //   .catch(resp=>{
  //     console.log(resp);
  //     this.retornoPersistencia.emit(false);
  //     this.toastyService.showError("Erro ao atualizar publicação!");
  //   });
  // }

  // getAllPessoas(){
  //   this.pessoas = [];
  //   this.pessoaService.getAll()
  //   .then(resp =>{
  //     if(resp != []){
  //       let lista: any[] = [];
  //       for(let i = 0; i<resp.length;i++){
  //         let dado = {
  //           label:resp[i].nome,
  //           value: resp[i].id_pessoa
  //         }
  //         lista.push(dado);
  //       }
  //       this.pessoas = lista;
  //     }
  //   })
  //   .catch(resp =>{
  //     console.log(resp);
  //   });
  // }
}
