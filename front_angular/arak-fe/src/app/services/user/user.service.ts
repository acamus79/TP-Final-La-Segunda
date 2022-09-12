import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReqUser, ReqUser } from '../../models/iusuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _refresh$ = new Subject<void>();
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();
  userEditFlag?: boolean = true;
  usertoken: any;
  idUser: any;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.usertoken = token;
    this.httpHeaders = this.httpHeaders.append(
      'Authorization',
      'Barer ' + token?.replace(/['"]+/g, '')
    );
  }

  getUserEnable() {
    return this.usertoken;
  }

  get refresh$() {
    return this._refresh$;
  }

  getUser$() {
    const rute = `${this.url}/index`;
    return this.http.get<IReqUser>(rute, {
      headers: this.httpHeaders,
      observe: 'response',
    });
  }

  addUser$(user: any) {
    const rute = `${this.url}/signup`;
    return this.http
      .post(rute, user, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getUserEditFlag() {
    return this.userEditFlag;
  }

  setUserEditFlag$(flag: boolean) {
    this.userEditFlag = flag;
  }

  setUserById(pId: any) {
    this.idUser = pId;
  }

  getUserById() {
    const rute = `${this.url}/display/${this.idUser}`;
    return this.http
      .get(rute, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  editUser$(form: any) {
    const rute = `${this.url}/update/${this.idUser}`;
    return this.http
      .put(rute, form, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }
}
