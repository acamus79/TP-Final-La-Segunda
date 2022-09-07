import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  vehicle: string;
  position: number;
  alert: string;
  date: string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, vehicle: 'Ford Focus', alert: "RTO", date: '22-09-19', action: 'X'},
  {position: 2, vehicle: 'Peugeot 206', alert: "GNC", date: '22-10-20', action: 'X'},
  {position: 3, vehicle: 'Ford Fiesta', alert: "RTO", date: '22-10-25', action: 'X'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'vehicle', 'alert', 'date', 'action'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
