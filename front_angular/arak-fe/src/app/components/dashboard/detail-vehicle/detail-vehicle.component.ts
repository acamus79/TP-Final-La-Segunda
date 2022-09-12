import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-detail-vehicle',
  templateUrl: './detail-vehicle.component.html',
  styleUrls: ['./detail-vehicle.component.css'],
})
export class DetailVehicleComponent implements OnInit {
  flagEdit?: boolean;
  disable?: boolean;
  btnEdit?: Boolean = false;
  users: any = [
    {
      id: 1,
      name: 'andres',
      mail: 'alopezcio@gmail.com',
      phone: 32423434,
      role: 'Admin',
    },
  ];
  type: any[] = [
    { value: 1, viewValue: 'Moto' },
    { value: 2, viewValue: 'Auto' },
    { value: 3, viewValue: 'Camioneta' },
    { value: 4, viewValue: 'Camion' },
    { value: 5, viewValue: 'Taxi/Remis' },
  ];
  selectedValue?: string;

  vehicle = {
    id: 1,
    type_id: 1,
    brand: 'Marca',
    model: 'Modelo',
    year: 'Año',
    tag: 'Patente N°',
    insurance: 'Seguro',
  };
  idVeicle: any;

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private vehicleService: VehiclesService,
    private router: Router
  ) {
    this.form = this.fb.group({});
    this.flagEdit = this.userService.getUserEditFlag();
    this.disable = this.flagEdit;
  }

  ngOnInit(): void {
    this.idVeicle = this.vehicleService.getIdVehicle();
    console.log('id vehicle', this.idVeicle);
    this.vehicleService.getOneVehicle$(this.idVeicle).subscribe((res: any) => {
      this.vehicle = res.body.data;
    });
  }

  enableEditUser() {
    this.userService.setUserEditFlag$(true);
    console.log('edit');
  }

  editUser() {
    console.log('endpont');
  }
}
