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

    // services tests

    //
    // userService.getAll().then((res) => {
    //   console.log(res);
    // });
    //
    // userService.getById(3).then((res) => {
    //   console.log('res', res);
    // });
    //
    // this.user.email= "myW@@";
    // this.user.first_name = "malina";
    //
    //
    // userService.add(this.user).then((res) => {
    //   console.log('dodane', res);
    // });
    //
    // projectService.remove(2).then();
    //
    // userService.getById(5).then((res) => {
    //   this.user = res.data;
    //
    //   this.user.first_name = 'malina';
    //   console.log('usr', this.user);
    //
    //   userService.update(this.user).then(() => {
    //     userService.getAll().then((res) => {
    //       console.log(res);
    //     });
    //   });
    // });







    // projectService.getAll().then((res) => {
    // console.log(res);
    // });

  }
}
