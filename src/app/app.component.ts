import {Component} from '@angular/core';
import {UserService} from './services/user/user.service';
import {User} from './model/user';
import {BehaviorSubject} from 'rxjs';
import {ProjectService} from './services/project/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'My App2';
  some: User[];

  user: User = new User();

  constructor(private userService: UserService,
              private projectService: ProjectService) {

  }
}
