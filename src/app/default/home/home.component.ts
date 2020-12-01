import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import AOS from 'aos';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';
import { PublishDTO } from 'src/app/core/model';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  displayForm: boolean = false;
  displaySpinner: boolean = false;
  publications: any[] = [];

  constructor(
    private db: AngularFirestore,
    private toastyService: ToastyService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    AOS.init();
    this.getAll();
  }
  
  returnPersistForm(event: boolean) {
    if (event) {
      this.getAll();
    }
    this.displayForm = false;
  }

  getAll() {
    this.displaySpinner = true;
    let publications: any[] = [];
    this.db.collection('publish', ref =>
      ref.where('isActive','==',true)
    ).get()
      .toPromise()
      .then((snapshot) => {
        snapshot.forEach((doc: any) => {
          let data = new PublishDTO();
          data.id = doc.id;
          data.publish = doc.data();
          publications.push(data);
        });
        this.publications = publications;
        this.displaySpinner = false;
      })
      .catch(error => {
        console.log(error);
        this.toastyService.showError("Erro ao listar publicações");
        this.displaySpinner = false;
      });
  }
}
