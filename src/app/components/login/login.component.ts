import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {AuthService} from '../../services/auth/auth.service';
import {LoginUser} from '../../model/user';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = 'mariankozaczek@example.com';
  public password: string = 'pass';
  public msgs: Message[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  login() {
    let loginUser: LoginUser = new LoginUser();
    loginUser.email = this.email;
    loginUser.password = sha256(this.password);

    this.authService.login(loginUser)
      .then(() => {
      });
  }

}
