import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

<<<<<<< HEAD
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}


=======
>>>>>>> acamus
@Component({
  selector: 'app-dialog-gen',
  templateUrl: './dialog-gen.component.html',
  styleUrls: ['./dialog-gen.component.css']
})

export class DialogGenComponent implements OnInit {
  form: FormGroup;
  selectedValue?: string;
  selectedCar?: string;
<<<<<<< HEAD
  lista: string[] = ["hola", "que", "tal", "estas"];
  seleccionados: string = 'Algo';
=======
>>>>>>> acamus
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();


<<<<<<< HEAD
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  cars: Car[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];


=======
>>>>>>> acamus
  type: any[] = [
    { value: 1, viewValue: 'Moto' },
    { value: 2, viewValue: 'Auto' },
    { value: 3, viewValue: 'Camioneta' },
    { value: 4, viewValue: 'Camion' },
    { value: 5, viewValue: 'Taxi/Remis' },
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,

  ) {
    this.form = this.fb.group({
<<<<<<< HEAD
=======
      type_id: ['', Validators.required],
>>>>>>> acamus
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      insurance: ['', Validators.required],
      tag: ['', Validators.required],
<<<<<<< HEAD
      type_id: ['', Validators.required],
=======
>>>>>>> acamus
    });
  }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''));

  }

  saveVehicle() {
    console.log('anda');
    console.log(this.form.value);
    this.http.post(`${this.url}/vehicle`, this.form.value,
      {
        headers: this.httpHeaders,
      }).subscribe(res => {
<<<<<<< HEAD
        console.log(res);
        this._snackBar.open('Vehiculo creado correctamente', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['blue-snackbar']
=======
        //console.log(res);
        this._snackBar.open('Vehiculo creado correctamente', 'Aceptar', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackOk']
        }).afterDismissed().subscribe(() => {
          this.router.navigate(['/dashboard/vehicles']);

>>>>>>> acamus
        });
      })
  }

}
