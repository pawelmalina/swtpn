import {Injectable} from '@angular/core';
import {LoginUser, Role, User} from '../../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';
import {RequestOptions} from '@angular/http';
import {Router, RouterState} from '@angular/router';
import {reject} from 'q';

@Injectable()
export class AuthService {

  user: User;
  isLogged: boolean = false;
  isManager: boolean = false;

  constructor(private http: HttpClient,
              private router: Router) {

    this.check();
  }

  private check() {
    this.isUserLogged().then((res) => {
      if (res != null) {
        this.loadUser();
      }
    });
  }

  apiUrl: string = EndPointsSettings.LOGIN;

  login(loginUser: LoginUser): Promise<any> {
    const url = `${this.apiUrl}/login`;

    let promise = new Promise((resolve) => {
      this.http.post(url, loginUser)
        .toPromise()
        .then(res => {
          if (res === 'OK') {
            this.check();
            resolve(true);
          }
          resolve(false);
        });
    });
    return promise;
  }

  logout() {
    this.isLogged = false;
    this.user = null;
    const url = `${this.apiUrl}/logout`;
    this.http.post(url, null).toPromise();
    this.router.navigate(['/']);
  }

  isUserLogged() {
    const url = `${this.apiUrl}/check`;
    return this.http.get(url)
      .toPromise();
  }

  loadUser() {
    const url = `${this.apiUrl}/logged-user`;

    this.http.get(url)
      .toPromise()
      .then(response => {
        this.user = response as User;
        this.isLogged = true;
        if (this.user.role.toString() === "MENAGER") {
          this.isManager = true;
        }
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
