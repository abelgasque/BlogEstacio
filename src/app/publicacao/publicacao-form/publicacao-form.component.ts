import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
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

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  task: AngularFireUploadTask;
  complete: boolean;
  caminhoImagem: any;
  imageSrc: any;
  items: MenuItem[];
  uploadedFiles: any[] = [];
  urlImg: any;

  constructor(
    public apoio: ApoioService,
    private db: AngularFirestore,
    private toasty: ToastyService,
    private storage: AngularFireStorage

  ) { }

  ngOnInit(): void { }

  removeFile() {
    this.publicacao.pathImg = "";
    this.publicacao.nameImg = "";
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];
      let fileName: any = file.name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        let urlImg: any = event.target.result;
        this.publicacao.pathImg = urlImg;
        this.publicacao.nameImg = fileName;
      }
    } else {
      this.urlImg = "";
    }
  }

  uploadFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.complete = false;
      let file = event.target.files[0];
      let path = `publicacoes/${file.name}`;
      let fileRef = this.storage.ref(path.replace(/\s/g, ''));
      this.task = this.storage.upload(path.replace(/\s/g, ''), file);
      this.task.then(up => {
        fileRef.getDownloadURL().subscribe(url => {
          this.complete = true
          this.publicacao.pathImg = url;
          this.publicacao.nameImg = file.name;
        })
      })
    }

  }

  insert() {
    this.db.collection("publicacao").add(Object.assign({}, this.publicacao))
      .then((resp) => {
        this.retornoPersistencia.emit(true);
        this.toasty.showSuccess("Publicação criada");
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao criar!");
      });
  }

  update() {
    this.db.collection("publicacao").doc(this.publicacao.id).update(Object.assign({}, this.publicacao))
      .then((resp: any) => {
        this.toasty.showSuccess("Publicação atualizada");
        this.retornoPersistencia.emit(true);
      })
      .catch(resp => {
        console.log(resp);
        this.retornoPersistencia.emit(false);
        this.toasty.showError("Erro ao atualizada!");
      });
  }

  gerenciarPersistencia() {
    if (this.publicacao.id == "") {
      this.insert();
    } else {
      this.update();
    }
  }

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
