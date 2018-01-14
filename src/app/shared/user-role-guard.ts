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

  canActivate() {
    const promise = new Promise((resolve) => {
      this.authService.isUserLogged().then((res) => {
        if (res) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate(['/']);
        }
      });
    });
    return promise;
  }

}
