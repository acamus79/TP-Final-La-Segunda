import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IVehicle } from 'src/app/models/iVehicle';
import { IResponse } from 'src/app/models/iresponse';
import { IReqResponse } from 'src/app/models/ireqresponse';



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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');
    console.log('get token', token);

    httpHeaders = httpHeaders.append('Authorization', 'Barer' + token);

    this.http.get<IReqResponse>(`${this.url}/vehicles`,
      {
        headers: httpHeaders,
        observe: 'response'

      }).subscribe(res => {
        console.log(res.body?.content)
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

}
