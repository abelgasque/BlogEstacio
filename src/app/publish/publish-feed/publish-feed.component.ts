import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApoioService } from 'src/app/core/apoio.service';
import { PublishDTO } from 'src/app/core/model';
import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import AOS from 'aos';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-publish-feed',
  templateUrl: './publish-feed.component.html',
  styleUrls: ['./publish-feed.component.css']
})
export class PublishFeedComponent implements OnInit {

  @Input() publications: any[] = [];
  @Input() isFooter: boolean = false;
  @Input() isHeader: boolean = false;
  @Input() isAddPublish: boolean = false;
  @Input() isActiveHeader: boolean = false;
  @Output() returnPersist = new EventEmitter<boolean>();
  displayForm: boolean = false;
  displaySpinner: boolean = false;
  titleForm: string;
  publishDTO = new PublishDTO();
  itemsTable: MenuItem[];

  constructor(
    private db: AngularFirestore,
    public apoioService: ApoioService,
    private toastyService: ToastyService,
    public authService: AuthService
  ) {
    this.getItemsTable();
  }

  ngOnInit() {
    AOS.init();
  }

  getItemsTable() {
    if (this.authService.userDTO.user.isActive) {
      this.itemsTable = [
        {
          label: 'Inserir', icon: 'pi pi-plus', command: () => {
            this.setPublish();
          }
        }
      ]
    }
  }

  returnPersistForm(event: boolean) {
    if (event) {
      this.returnPersist.emit(true);
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
    let user: any = {
      'name': this.authService.userDTO.user.name,
      'id': this.authService.userDTO.id,
      'photoURL': this.authService.userDTO.user.photoURL
    }
    this.publishDTO.publish.user = user;
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

}
