import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth/auth.service';

import { UserI } from '../../../models/user.interface';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  //user: UserI[]

  constructor() { }

  ngOnInit(): void {

    //this.user = JSON.parse(localStorage.getItem('user'));




  }

}
