import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DefaultModule } from './default/default.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { PublicacaoModule } from './publicacao/publicacao.module';
import { UsuarioModule } from './usuario/usuario.module';

registerLocaleData(localePt);

import "firebase/auth";
import "firebase/firestore";

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
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule, 

    SharedModule,
    DefaultModule,
    SegurancaModule,
    PublicacaoModule,
    UsuarioModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
