import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-dialog-gen',
  templateUrl: './dialog-gen.component.html',
  styleUrls: ['./dialog-gen.component.css']
})

export class DialogGenComponent implements OnInit {
  form: FormGroup;
  selectedValue?: string;
  selectedCar?: string;
  lista:string[]=["hola","que","tal", "estas"];
  seleccionados:string = 'Algo'


  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'saab', viewValue: 'Saab'},
    {value: 'mercedes', viewValue: 'Mercedes'},
  ];


  /* type: any[] = [
    {value: 1, viewValue: 'Moto'},
    {value: 2, viewValue: 'Auto'},
    {value: 3, viewValue: 'Camioneta'},
    {value: 4, viewValue: 'Camion'},
    {value: 5, viewValue: 'Taxi/Remis'},
  ]; */

  constructor(
    private fb: FormBuilder,

  ) { 
    this.form = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      insurance: ['', Validators.required],
      tag: ['', Validators.required],
      userId: ['', Validators.required],
      type_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  saveVehicle() {
    console.log('form vehicle')
  }

}
