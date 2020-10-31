import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private afAuth: AngularFireAuth) {
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }


}
