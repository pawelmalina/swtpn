import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import 'rxjs/add/operator/toPromise';
import {Http} from '@angular/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {HttpClient} from '@angular/common/http';
import {CRUDServiceInterface} from '../crud.service.interface';
import {Observable} from 'rxjs';


@Injectable()
export class UserService {

  private userUrl = EndPointsSettings.USER;

  private users: User[];

  constructor(private http: HttpClient) {

  }

  getAll(): Promise<any> {
    return this.http.get(this.userUrl)
      .toPromise()
      .then(response => response as User[])
      .catch(this.handleError);
  }

  getById(id: number): Promise<any> {
    const url = `${this.userUrl}/${id}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  add(user: User): Promise<any> {
    return this.http.post(this.userUrl, user)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

  remove(id: number) {
    const url = `${this.userUrl}/${id}`;
    return this.http.delete(url)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const url = `${this.userUrl}/${user.id}`;

    return this.http.put(url, user)
      .toPromise().then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
