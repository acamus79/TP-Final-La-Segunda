import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  url: string = environment.api;
  httpHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router,

  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      subjet: [''],
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveContact() {
    console.log("esto llega",this.form.value);

    if(this.form.valid){

      this.http.post(`${this.url}/contact/create`, this.form.value, {

      }).subscribe(
        (res) => {
          console.log(res);
          this._snackBar.open('Mensaje enviado correctamente', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackOk']
          });
          this.router.navigate(['/dashboard/vehicles']);
        },
        (err) => {
          console.log(err);
          this._snackBar.open('Error al enviar el mensaje', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackError']
          });
        }
      );
    }
  }
}
