import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { SharedModule } from '../shared/shared.module';
import { DefaultModule } from '../default/default.module';
import { SecurityModule } from '../security/security.module';
import { UserAccountModule } from '../user-account/user-account.module';
import { UserModule } from '../user/user.module';
import { PublishModule } from '../publish/publish.module';
import { ApoioService } from './apoio.service';

registerLocaleData(localePt);

const firebaseConfig = {
  apiKey: "AIzaSyDIKJpbca_HnfKF5jHu8bBy4P2iZB2pkUQ",
  authDomain: "blog-6dd54.firebaseapp.com",
  databaseURL: "https://blog-6dd54.firebaseio.com",
  projectId: "blog-6dd54",
  storageBucket: "blog-6dd54.appspot.com",
  messagingSenderId: "566860481127",
  appId: "1:566860481127:web:87f1866a39102e9c324ac2"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,

    SharedModule,
    DefaultModule,
    SecurityModule,
    UserModule,
    UserAccountModule,
    PublishModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ApoioService
  ],
  exports: [
    SharedModule,
    DefaultModule,
    SecurityModule,
    UserModule,
    UserAccountModule,
    PublishModule,]
})
export class CoreModule { }
