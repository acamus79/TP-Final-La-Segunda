import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginI } from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(public http: HttpClient) {}

  login$(data: any) {
    return this.http.post(`${this.url}/signin`, data, {
      observe: 'response',
      headers: this.httpHeaders,
    });
  }
}
