import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displaySpinner: boolean = false;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
