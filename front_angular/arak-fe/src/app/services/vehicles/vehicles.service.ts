import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; 
import { IVehicle } from '../../models/iVehicle';



@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private vehicles: IVehicle[];
  private vehicles$: Subject<IVehicle[]>;

  constructor() { 
    this.vehicles = [];
    this.vehicles$ = new Subject();
  }

  addVehicle(pVehicle:IVehicle) {
    this.vehicles.push(pVehicle);
    this.vehicles$.next(this.vehicles);
  }

  getVehicle$(): Observable<IVehicle[]> {
    return this.vehicles$.asObservable()

  }
}
