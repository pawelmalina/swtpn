import {Component, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/primeng';
import {AuthService} from '../../services/auth/auth.service';
import {LoginUser, User} from '../../model/user';
import {sha256} from 'js-sha256';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = 'alannowak@example.com';
  public password: string = 'pass';
  public msgs: Message[] = [];

  state: AuthService;

  constructor(private messageService: MessageService,
              authService: AuthService) {
    this.state = authService;
  }

  ngOnInit() {

  }

  login() {
    const loginUser: LoginUser = new LoginUser();
    loginUser.email = this.email;
    loginUser.password = sha256(this.password);

    this.state.login(loginUser)
      .then((res) => {
        let sm = res as Promise<boolean>
        if (sm) {
          this.messageService.add({severity: 'success', summary: 'Logowanie', detail: 'Operacja powiodła sie'});
        } else {
          this.messageService.add({severity: 'error', summary: 'Logowanie', detail: 'Niepoprawny email lub hasło'});
        }
        this.clearLoginUserFields();
      });
  }

  logout() {
    this.state.logout();
  }

  clearLoginUserFields() {
    this.email = '';
    this.password = '';
  }

}
