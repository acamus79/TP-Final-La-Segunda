/* import { Injectable } from '@angular/core';
import {LoginI} from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = 'http://localhost:3000/api';


  constructor(private http:HttpClient) { }

  login(data:LoginI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/signin`, data);
  }

} */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {LoginI} from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
//import { NotificacitionService } from '../../../shared/services/notificacition.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url: string = environment.api;

  constructor(
    public http: HttpClient,
    private router: Router,
    //private notificacition: NotificacitionService,
    private cookieService: CookieService
  ) { }

  login(data:LoginI):Observable<ResponseI>{
    
    return this.http.post<ResponseI>(`${this.url}/signin`, data);

  /* login(data: any) {

    return this.http.post(`${this.url}/signin`, data, { observe: 'response' })


    const respuesta = this.http.post(`${this.url}/signin`, data)
    console.log("ESTA ES LO QUE BUSCAMOS " +respuesta);

    return respuesta.pipe(
        catchError((e: any) => {
          console.log(e.error.error)
          //this.notificacition.handleError(e.error.error)
          return throwError(e);
        })
      ); */

  }


  setterSettings = (res: any) => {
    this.cookieService.set(
      'session',
      res.token,
      1,
      '/');
    this.cookieService.set(
      'user',
      JSON.stringify(res.user),
      1,
      '/');
  }


  currentUser = () => {
    try {
      return (this.cookieService.get('user')) ? JSON.parse(this.cookieService.get('user')) : null;
    } catch (e) {
      return null
    }
  }

  public clear = () => {
    this.cookieService.delete('session', '/');
    this.cookieService.delete('user', '/');
  }

  public redirectLogin() {
    this.router.navigate(['/', 'auth']);
  }

  checkSession = (redirect = true) => {
    return new Promise((resolve, reject) => {
      if (this.cookieService.check('session')) {
        this.http.get(`${this.url}/token`).subscribe((res: any) => {
          this.setterSettings(res.data)
          reject(false)
        }, (error: any) => {
          this.clear();
          this.redirectLogin();
        })
        resolve(true);
      } else {
        redirect ? this.redirectLogin() : null;
        reject(false);
      }
    }
    );
  };

  public logout = () => new Promise((resolve, reject) => {
    try {
      this.clear();
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });

}