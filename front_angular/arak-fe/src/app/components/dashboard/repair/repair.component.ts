import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css'],
})
export class RepairComponent implements OnInit {
  form: FormGroup;
  vehicleByUser: any;
  selectedVehicle: any;
  vehicle_id: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private vehicleService: VehiclesService
  ) {
    this.form = this.fb.group({
      vehicle_id: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicleByUser().subscribe((res: any) => {
      console.log(res);
      this.vehicleByUser = res.body.content;
    });
  }

  addRepair() {
    this.vehicleService.addRepair(this.form.value).subscribe();
    console.log(this.form.value);
  }
}
