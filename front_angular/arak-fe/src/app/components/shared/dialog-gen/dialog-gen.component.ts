import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-gen',
  templateUrl: './dialog-gen.component.html',
  styleUrls: ['./dialog-gen.component.css'],
})
export class DialogGenComponent implements OnInit {
  suscription?: Subscription;
  form: FormGroup;
  selectedValue?: string;
  selectedBrand?: string;
  selectedCar?: string;
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();
  close: boolean = false;

  type: any[] = [
    { value: 1, viewValue: 'Moto' },
    { value: 2, viewValue: 'Auto' },
    { value: 3, viewValue: 'Camioneta' },
    { value: 4, viewValue: 'Camion' },
    { value: 5, viewValue: 'Taxi/Remis' },
  ];

  brands: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,
    private vehicleService: VehiclesService
  ) {
    this.form = this.fb.group({
      type_id: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      insurance: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append(
      'Authorization',
      'Barer ' + token?.replace(/['"]+/g, '')
    );

    this.getBrandByApi();
  }

  saveVehicle() {
    this.vehicleService.addVehicle$(this.form.value).subscribe((res: any) => {
      this._snackBar
        .open('Vehiculo creado correctamente', 'Aceptar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackOk'],
        })
        .afterDismissed()
        .subscribe(() => {
          this.close = true;
          this.router.navigate(['/dashboard/vehicles']);
        });
    });
  }

  //API EXTERNA
  getBrandByApi() {
    this.http.get(`${environment.ext}`).subscribe({
      next: (res: any) => {
        this.brands = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
