import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  selected = new FormControl(0);

  // constructor(private db: AngularFirestore) {
  //   const things = db.collection('pessoa').valueChanges();
  //   things.subscribe(console.log);
  // }

  constructor(public afAuth: AngularFireAuth) {

  }
  ngOnInit(): void {
  }

  // Sign in with Google
  
}
