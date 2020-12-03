import { Component, OnInit } from '@angular/core';
import { ApoioService } from 'src/app/core/apoio.service';
import { UserDTO } from 'src/app/core/model';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-user-account-default',
  templateUrl: './user-account-default.component.html',
  styleUrls: ['./user-account-default.component.css']
})
export class UserAccountDefaultComponent implements OnInit {

  userDTO = new UserDTO();

  constructor(
    public auth: AuthService,
    private apoioService: ApoioService,
  ) {
    this.getUserAccount();
  }

  ngOnInit(): void {
  }

  getUserAccount() {
    let userDTO = this.apoioService.getUserStorage();
    if (userDTO.user.dtBirth) {
      userDTO.user.dtBirth = new Date(userDTO.user.dtBirth.toString());
    }
    this.userDTO = userDTO;
  }
}
