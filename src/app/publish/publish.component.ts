import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MenuItem } from 'primeng/api';
import { ToastyService } from '../shared/components/toasty/toasty.service';
import { ApoioService } from '../core/apoio.service';
import { PublishDTO } from '../core/model';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  displaySpinner: boolean = false;
  displayForm: boolean = false;
  titleForm: string = "Incluir";
  publications: any[] = [];
  publishDTO = new PublishDTO();
  itemsTable: MenuItem[];

  constructor(
    public apoioService: ApoioService,
    private toastyService: ToastyService,
    private db: AngularFirestore,
  ) {
    this.getAll();
    this.getItemsTable();
  }

  ngOnInit(): void {
  }

  getItemsTable() {
    this.itemsTable = [
      {
        label: 'Inserir', icon: 'pi pi-plus', command: () => {
          this.setPublish();
        }
      }
    ]
  }

  returnPersistForm(event: boolean) {
    if (event) {
      this.getAll();
    }
    this.displayForm = false;
  }

  getPublish(id: string) {
    this.publishDTO = new PublishDTO();
    this.titleForm = "Alterar";
    this.getById(id);
  }

  setPublish() {
    this.publishDTO = new PublishDTO();
    this.titleForm = "Incluir";
    this.displayForm = true;
  }

  getById(id: string) {
    this.displaySpinner = true;
    this.db.collection('publish').doc(id).get()
      .toPromise()
      .then((resp: any) => {
        if (resp.exists) {
          let data: any = {
            'publish': resp.data(),
            'id': resp.id
          }
          data.publish.dt_publish = data.publish.dt_publish.toDate();
          this.publishDTO = data;
          this.displayForm = true;
        }
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        this.toastyService.showError("Erro ao buscar publicação por id!");
        this.displaySpinner = false;
      });
  }

  getAll() {
    this.displaySpinner = true;
    let publications: any[] = [];
    this.db.collection('publish').get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let data = {
            'id': doc.id,
            'data': doc.data()
          }
          publications.push(data);
        });
        this.publications = publications;
        this.displaySpinner = false;
      })
      .catch(error =>{
        console.log(error);
        this.toastyService.showError("Erro ao listar publicações");
      });
  }
}
