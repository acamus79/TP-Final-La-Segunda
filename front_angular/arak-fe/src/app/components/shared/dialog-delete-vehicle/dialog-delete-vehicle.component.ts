import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';

@Component({
  selector: 'app-dialog-delete-vehicle',
  templateUrl: './dialog-delete-vehicle.component.html',
  styleUrls: ['./dialog-delete-vehicle.component.css']
})
export class DialogDeleteVehicleComponent implements OnInit {

  constructor(
    private vehicleService: VehiclesService,
  ) { }

  ngOnInit(): void {
  }

  delete(){
    console.log('boton confirmar delete')
    this.vehicleService.deleteVehicle().subscribe({
      
    })
 }
}
