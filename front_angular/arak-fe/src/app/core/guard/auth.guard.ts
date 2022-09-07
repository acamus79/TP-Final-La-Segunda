import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService ) { }

  canActivate() {
    return this.authService.checkSession(true).then(a => {
      console.log(a);
      return true;
    }).catch(e => {
      console.log(e);
      return false;
    });
  }

}
