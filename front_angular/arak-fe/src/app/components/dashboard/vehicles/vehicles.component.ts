import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IVehicle } from 'src/app/models/iVehicle';
import { IRes } from 'src/app/models/Ires';
import { IReqResponse } from 'src/app/models/ireqresponse';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenComponent } from '../../shared/dialog-gen/dialog-gen.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Subscription } from 'rxjs';
import { DialogDeleteVehicleComponent } from '../../shared/dialog-delete-vehicle/dialog-delete-vehicle.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  suscription?: Subscription;
  num: number = 0;
  httpHeaders: HttpHeaders = new HttpHeaders();
  url: string = environment.api;
  vehicles: any = [];
  colum = ['typeId', 'brand', 'model', 'year', 'tag', 'insurance', 'accion'];

  tipos = [{ id: 1 }];

  displayedColumns: string[] = this.colum;
  dataSource: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private vehicleService: VehiclesService
  ) {}

  getToken(): void {
    const tok = localStorage.getItem('token');

    if (tok) JSON.parse(tok);
  }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role == '2') {
      console.log('rol Usuario 2');
      this.getVehicleByUser();
    } else {
      console.log('rol admin');
      this.getVehicles();
    }

    this.suscription = this.vehicleService.refresh$.subscribe(() => {
      if (role == '2') {
        this.getVehicleByUser();
      } else {
        this.getVehicles();
      }
    });
  }

  getVehicleByUser() {
    this.vehicleService.getVehicleByUser().subscribe((res: any) => {
      console.log('entra');
      this.dataSource = res.body.content;
    });
  }

  getVehicles() {
    this.vehicleService.getVehicle$().subscribe((res: any) => {
      this.dataSource = res.body.content;
    });
  }

  /* deleteVehicle(id: any) {
    this.http.delete<IRes>(`${this.url}/vehicle/${id}`,
      {
        headers: this.httpHeaders,
      }).subscribe(res => {
        console.log(res.status),
          console.log(res.msg);
        this._snackBar.open(res.msg, '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snakOk']
        });
      }, error => {
        this._snackBar.open('Error al eliminar un Vehiculo', '', {
          duration: 9000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snakError']
        });
      }
      )
  } */

  deleteVehicle(pId: any) {
    console.log('envio pId');
    this.vehicleService.reciboDato(pId);
    this.dialog.open(DialogDeleteVehicleComponent);
  }

  openDialog() {
    this.dialog.open(DialogGenComponent);
  }

  goToDetail(id: any) {
    this.vehicleService.setIdVehicle(id);
    this.router.navigate(['dashboard/detailVehicle']);
  }
}
