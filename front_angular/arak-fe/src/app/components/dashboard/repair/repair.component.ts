import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private vehicleService: VehiclesService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      vehicle_id: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicleByUser().subscribe((res: any) => {
      this.vehicleByUser = res.body.content;
    });
  }

  addRepair() {
    this.vehicleService.addRepair(this.form.value).subscribe(() => {
      this._snackBar.open('Reparacion agregada', '', {
        duration: 3000,
        panelClass: ['snackOk', 'snack'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.form.reset();
    });
  }
}
