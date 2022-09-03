import { Injectable } from '@angular/core';
import {LoginI} from 'src/app/models/login.interface';
import { ResponseI } from 'src/app/models/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = 'http://localhost:3000/api';


  constructor(private http:HttpClient) { }

  login(data:LoginI):Observable<ResponseI>{
    return this.http.post<ResponseI>(`${this.url}/signin`, data);
  }

}
