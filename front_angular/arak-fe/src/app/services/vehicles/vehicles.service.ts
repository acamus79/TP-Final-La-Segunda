import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IVehicle } from '../../models/iVehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private _refresh$ = new Subject<void>();
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();
  private vehicles: IVehicle[];
  private vehicles$: Subject<IVehicle[]>;
  id?: number;
  idVehicle?: number;

  constructor(private http: HttpClient) {
    this.vehicles = [];
    this.vehicles$ = new Subject();
    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append(
      'Authorization',
      'Barer ' + token?.replace(/['"]+/g, '')
    );
  }

  get refresh$() {
    return this._refresh$;
  }

  reciboDato(dato: any) {
    this.id = dato;
  }

  deleteVehicleByUser() {
    const rute = `${this.url}/vehicle/user/${this.id}`;
    return this.http
      .delete<any>(rute, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  deleteVehicle() {
    const rute = `${this.url}/vehicle/${this.id}`;
    return this.http
      .delete<any>(rute, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  getVehicle$() {
    const rute = `${this.url}/vehicle/all`;
    return this.http.get<IVehicle>(rute, {
      headers: this.httpHeaders,
      observe: 'response',
    });
  }

  setIdVehicle(id: number) {
    this.idVehicle = id;
  }

  getIdVehicle() {
    return this.idVehicle;
  }

  getOneVehicle$(id: number) {
    const rute = `${this.url}/vehicle/${id}`;
    return this.http.get<IVehicle>(rute, {
      headers: this.httpHeaders,
      observe: 'response',
    });
  }

  getVehicleByUser() {
    const rute = `${this.url}/vehicle/user/all`;
    return this.http.get<IVehicle>(rute, {
      headers: this.httpHeaders,
      observe: 'response',
    });
  }

  addRepair(pRepair: any) {
    const rute = `${this.url}/repair`;
    return this.http
      .post<any>(rute, pRepair, {
        headers: this.httpHeaders,
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this._refresh$.next();
        })
      );
  }

  addVehicle$(form: any) {
    const rute = `${this.url}/vehicle`;
    return this.http
      .post<any>(rute, form, {
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
