import { Injectable } from '@angular/core';
import {LoginUser, User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {EndPointsSettings} from '../../shared/end-points-settings';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl: string = EndPointsSettings.LOGIN;

  login(loginUser: LoginUser) {
    const url = `${this.apiUrl}/login`

    return this.http.post(url, loginUser)
      .toPromise().then()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
