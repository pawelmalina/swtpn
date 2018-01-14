import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Injectable} from '@angular/core';
import {Role} from '../model/user';
/**
 * Created by pawel on 13.01.18.
 */

@Injectable()
export class MenagerRoleGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isLogged;
  }
}
