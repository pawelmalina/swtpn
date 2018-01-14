import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth/auth.service';
import {Url} from 'url';
import {Observable} from 'rxjs';
/**
 * Created by pawel on 13.01.18.
 */

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  // canActivate() {
  //   return this.authService.isLogged;
  // }

  canActivate() {
    return this.authService.isUserLogged();
  }

  // canActivate(): Observable<boolean> {
  //   return this.auth..map(authState => {
  //     if (!authState) this.router.navigate(['/login']);
  //     console.log('activate?', !!authState);
  //     return !!authState;
  //   }).take(1)
  // }

}
