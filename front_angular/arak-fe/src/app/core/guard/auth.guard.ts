import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserLogin(route);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    const tokenEnable = this.userService.getUserEnable();
    console.log('me llega el token', tokenEnable);
    if (localStorage.getItem('token')) {
      console.log('estoy en el if', tokenEnable);
      return true;
    } else {
      console.log('else algo anda mal', tokenEnable);
      this.route.navigate(['/']);
      console.log('else algo anda muy mal', tokenEnable);
      return false;
    }
  }
}
