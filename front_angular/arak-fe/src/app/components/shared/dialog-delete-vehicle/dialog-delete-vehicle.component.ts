import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-dialog-delete-vehicle',
  templateUrl: './dialog-delete-vehicle.component.html',
  styleUrls: ['./dialog-delete-vehicle.component.css'],
})
export class DialogDeleteVehicleComponent implements OnInit {
  role: any;
  constructor(private vehicleService: VehiclesService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  delete() {
    if (this.role == '1' || this.role == '3') {
      this.vehicleService.deleteVehicle().subscribe();
    } else {
      this.vehicleService.deleteVehicleByUser().subscribe();
    }
  }
}
