import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append(
      'Authorization',
      'Barer ' + token?.replace(/['"]+/g, '')
    );
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
}
