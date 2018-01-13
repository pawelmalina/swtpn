import {Injectable} from '@angular/core';
import {LoginUser, User} from '../../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {RequestOptions} from '@angular/http';

@Injectable()
export class AuthService {

  private currentUser: User;
  private isLogged: boolean = false;

  constructor(private http: HttpClient) {
  }

  apiUrl: string = EndPointsSettings.LOGIN;

  login(loginUser: LoginUser) {
    const url = `${this.apiUrl}/login`;

    return this.http.post(url, loginUser)
      .toPromise()
      .catch(this.handleError);
  }

  logout() {
    this.isLogged = false;
    this.currentUser = null;
    const url = `${this.apiUrl}/logout`;
    return this.http.post(url, null).toPromise();
  }

  isUserLogged() {
    if (this.isLogged === true) {
      return Promise.resolve(true);
    }

    const url = `${this.apiUrl}/check`;

    return this.http.get(url)
      .toPromise()
      .catch(this.handleError);
  }

  getLoggedUser(): Promise<any> {
    if (this.currentUser != null) {
      return Promise.resolve(this.currentUser);
    }
    const url = `${this.apiUrl}/logged-user`;

    return this.http.get(url)
      .toPromise()
      .then(response => {
        const user = response as User;
        this.currentUser = user;
        return user;
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
