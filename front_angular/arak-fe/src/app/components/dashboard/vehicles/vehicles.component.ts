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




@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  num: number = 0;
  httpHeaders: HttpHeaders = new HttpHeaders();
  url: string = environment.api;
  vehicles: any = [];
  colum = [
    "brand",
    "model",
    "year",
    'tag',
    "insurance",
    "typeId",
    "accion"
  ];

  tipos = [
    { id: 1, }
  ]



  displayedColumns: string[] = this.colum;
  dataSource: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  getToken(): void {
    const tok = localStorage.getItem('token');

    if (tok) JSON.parse(tok)

  }

  ngOnInit(): void {
    //let httpHeaders: HttpHeaders = new HttpHeaders();
    //const token = localStorage.getItem('token'); */
    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''));

    /* if (token) {
      JSON.parse(token),
      console.log('get token if', token);
    }  */


    console.log('mando al enpoint', token?.replace(/['"]+/g, ''))



    //httpHeaders = httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''));

    this.http.get<IReqResponse>(`${this.url}/vehicle/all`,
      {
        headers: this.httpHeaders,
        observe: 'response'

      }).subscribe(res => {
        //console.log(res.body?.content)
        this.vehicles = res.body?.content
        this.dataSource = this.vehicles

        this.vehicles.forEach((element: any) => {
          console.log('cada elemento es: ', element)
        });

        console.log('me vienen los vechicles', this.vehicles)
      }, error => {
        console.log('error al obtener los datos', error)
      })

  }

  deleteVehicle(id: any) {
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
  }


  hacerAlgo() {
    console.log('boton')
  }

  openDialog() {
    this.dialog.open(DialogGenComponent);
  }

}
