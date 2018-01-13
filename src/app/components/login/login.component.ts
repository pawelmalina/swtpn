import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {AuthService} from '../../services/auth/auth.service';
import {LoginUser, User} from '../../model/user';
import {sha256} from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = 'mariankozaczek@example.com';
  public password: string = 'pass';
  public msgs: Message[] = [];

  currentUser: User;
  isLoggedUser: boolean = false;

  constructor(private authService: AuthService) {
    this.checkLoggedUser();
  }

  ngOnInit() {
  }

  checkLoggedUser() {
    this.authService.isUserLogged().then((res) => {
      if (res) {
        this.getLoggedUser();
      }
    });
  }

  login() {
    const loginUser: LoginUser = new LoginUser();
    loginUser.email = this.email;
    loginUser.password = sha256(this.password);

    this.authService.login(loginUser)
      .then(() => {
        this.checkLoggedUser();
      });

  }

  logout() {
    this.authService.logout().then(() => {
      this.clearUser();
    });
  }

  getLoggedUser() {
    this.authService.getLoggedUser()
      .then((user) => {
        // this.clearLoginUserFields(); //todo after develop remove comments
        this.currentUser = user;
        this.isLoggedUser = true;
      });
  }

  clearLoginUserFields() {
    this.email = '';
    this.password = '';
  }

  clearUser() {
    this.currentUser = null;
    this.isLoggedUser = false;
  }

}
