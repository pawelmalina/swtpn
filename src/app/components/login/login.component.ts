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

  public email: string = 'mariankozaczek@example.com';
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
        debugger;
        if (this.state.isLogged) {
          debugger;
          this.messageService.add({severity: 'success', summary: 'Service Message', detail: 'Via MessageService'});
        }
      });
    this.messageService.add({severity: 'primary', summary: 'Service Message', detail: 'Via MessageService'});
  }

  logout() {
    this.state.logout();
  }

  clearLoginUserFields() {
    this.email = '';
    this.password = '';
  }

}
