import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'My App2';
  some: User[];
  constructor(private userService: UserService) {

     userService.getUsers().then((data) => {
      this.some = data;
      console.log(this.some);
     });



  }
}
