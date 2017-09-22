import {Injectable} from '@angular/core';
import {User} from '../model/user';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';


@Injectable()
export class UserService {

  private userUrl = 'api/heroes'
  private users: User[];
  constructor(private http: Http) {

  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
