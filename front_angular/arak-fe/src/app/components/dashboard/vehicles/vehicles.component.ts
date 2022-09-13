import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit /* AfterViewInit */ {
  @ViewChild(MatSort) sort?: MatSort;

  suscription?: Subscription;
  num: number = 0;
  httpHeaders: HttpHeaders = new HttpHeaders();
  url: string = environment.api;
  vehicles: any = [];
  colum = ['typeId', 'brand', 'model', 'year', 'tag', 'insurance', 'accion'];

  tipos = [{ id: 1 }];

  displayedColumns: string[] = this.colum;
  dataSource: any;
  dataSourceGet: any;
  filter: any;
  order: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private vehicleService: VehiclesService
  ) {
    /* applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      } */
  }

  getToken(): void {
    const tok = localStorage.getItem('token');

    if (tok) JSON.parse(tok);
  }

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role == '2') {
      this.getVehicleByUser();
    } else {
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

  /* ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  } */

  getVehicleByUser() {
    this.vehicleService.getVehicleByUser().subscribe((res: any) => {
      this.dataSourceGet = res.body.content;
      return (this.dataSource = this.dataSourceGet);
    });
  }

  getVehicles() {
    this.vehicleService.getVehicle$().subscribe((res: any) => {
      this.dataSourceGet = res.body.content;
      return (this.dataSource = this.dataSourceGet);
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

  filterByname(brand: any) {
    let dataSourceFiltered;
    dataSourceFiltered = this.dataSource.filter((item: any) => {
      return item.brand.toLowerCase() == brand.toLowerCase();
    });
    return (this.dataSource = dataSourceFiltered);
  }

  resetFilter() {
    console.log();
    return (this.dataSource = this.dataSourceGet);
  }

  SortArray(x: any, y: any) {
    if (x.brand.toLowerCase() > y.brand.toLowerCase()) {
      return -1;
    }
    if (x.brand.toLowerCase() < y.brand.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  orderBy() {
    console.log(this.dataSource);
    let dataSourceFiltered = this.dataSource;
    const dataSourceFiltered2 = dataSourceFiltered.sort(this.SortArray);
    this.dataSource = dataSourceFiltered2;
    console.log(dataSourceFiltered2);
    console.log(this.dataSource);
    return this.dataSource;
  }

  resetSort() {
    this.getVehicleByUser();
  }
}
