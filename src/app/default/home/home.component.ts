import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import AOS from 'aos';
import { ToastyService } from 'src/app/shared/components/toasty/toasty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displaySpinner: boolean = false;
  publicacoes: any[] = [];

  constructor(
    private toastyService: ToastyService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    AOS.init();
    this.getAll();
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
