import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApoioService } from 'src/app/core/apoio.service';
import { PublishDTO, UserDTO } from 'src/app/core/model';
import { AuthService } from 'src/app/security/auth.service';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';

@Component({
  selector: 'app-user-account-publications',
  templateUrl: './user-account-publications.component.html',
  styleUrls: ['./user-account-publications.component.css']
})
export class UserAccountPublicationsComponent implements OnInit {

  publications: any[] = [];
  userDTO = new UserDTO();

  constructor(
    private db: AngularFirestore,
    private toastyService: ToastyService,
    public auth: AuthService,
    private apoioService: ApoioService,
  ) {
    this.getPublicationsUserAccount();
  }

  ngOnInit(): void {

  }
  returnPersistForm(event: boolean) {
    if (event) {
      this.getPublicationsUserAccount();
    }
  }

  getPublicationsUserAccount() {
    this.userDTO = this.apoioService.getUserStorage();
    let publications: any[] = [];
    this.db.collection('publish', ref => ref.where('user.id', '==', this.userDTO.id)).get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc: any) => {
          let publishDTO = new PublishDTO();
          publishDTO.id = doc.id;
          publishDTO.publish = doc.data();
          publications.push(publishDTO);
        });
        this.publications = publications;
      })
      .catch(error => {
        console.log(error);
        this.toastyService.showError("Erro ao listar publicações do usuário!");
      });
  }

  isAddPublish(): boolean {
    if (this.auth.userDTO.id == this.userDTO.id && this.auth.userDTO.user.isActive) {
      return true;
    } else {
      return false;
    }
  }
}
