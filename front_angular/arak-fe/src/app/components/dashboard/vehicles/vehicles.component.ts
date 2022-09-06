import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IVehicle } from 'src/app/models/iVehicle';
import { IResponse } from 'src/app/models/iresponse';
import { IReqResponse } from 'src/app/models/ireqresponse';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenComponent } from '../../shared/dialog-gen/dialog-gen.component';




@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  url: string = environment.api;
  vehicles: any = [];
  colum = [
    "id",
    "brand",
    "model",
    "year",
    "rto",
    "gnc",
    "insurance",
    "service",
    "typeId",
    "userId",
    "accion"
  ];

  displayedColumns: string[] = this.colum;
  dataSource: any;
  datos = 'Hola';

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) { }

  getToken(): void {
    const tok = localStorage.getItem('token');
    
    if (tok) JSON.parse(tok) 

  }

  ngOnInit(): void {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');

    /* if (token) {
      JSON.parse(token),
      console.log('get token if', token);
    }  */

  
    console.log('mando al enpoint', token?.replace(/['"]+/g, ''))
    
    

    httpHeaders = httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''));

    this.http.get<IReqResponse>(`${this.url}/vehicle/all`,
      {
        headers: httpHeaders,
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


  hacerAlgo() {
    console.log('boton')
  }

  openDialog() {
    this.dialog.open(DialogGenComponent);
  }

}
