import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs'; 
import { IVehicle } from '../../models/iVehicle';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private _refresh$ = new Subject<void>();
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();
  private vehicles: IVehicle[];
  private vehicles$: Subject<IVehicle[]>;
  id?:number

  constructor(
    private http: HttpClient
  ) { 
    this.vehicles = []
    this.vehicles$ = new Subject()
    const token = localStorage.getItem('token')
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''))
  }

  get refresh$() {
    return this._refresh$;
  };

  reciboDato(dato:any) {
    console.log(dato)
    this.id = dato
    console.log('este es el this id', this.id)
  }

  deleteVehicle() {
    console.log('entra al delete service')
    const rute = `${this.url}/vehicle/${this.id}`;
    return this.http.delete<any>( rute, {    
      headers: this.httpHeaders,
      observe: 'response'
    }).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  };

  getVehicle$() {
    const rute = `${this.url}/vehicle/all`;
    return this.http.get<IVehicle>( rute, {    
      headers: this.httpHeaders,
      observe: 'response'
    });
  };

  /* addVehicle(pVehicle:IVehicle) {
    this.vehicles.push(pVehicle);
    this.vehicles$.next(this.vehicles);
  }

  getVehicle$(): Observable<IVehicle[]> {
    return this.vehicles$.asObservable() 

  }*/
}