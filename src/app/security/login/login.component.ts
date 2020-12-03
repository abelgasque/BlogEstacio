import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserDTO } from 'src/app/core/model';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displaySpinner: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.loggout();
  }

  loggout() {
    this.auth.signOut()
      .then(resp => {
        this.authService.userDTO = new UserDTO();
      })
      .catch(resp => {
        console.log(resp);
      });
  }
}
