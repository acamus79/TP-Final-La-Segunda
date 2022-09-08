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
    private router: Router
  ) {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.httpHeaders = this.httpHeaders.append('Authorization', 'Barer ' + token?.replace(/['"]+/g, ''));
  }

  saveContact() {
    console.log(this.form.value);
    if(this.form.valid){
      this.http.post(`${this.url}/contact`, this.form.value, {
        headers: this.httpHeaders,
      }).subscribe(
        (res) => {
          console.log(res);
          this._snackBar.open('Mensaje enviado correctamente', 'OK', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackOk']
          });
          this.router.navigate(['/dashboard']);
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
