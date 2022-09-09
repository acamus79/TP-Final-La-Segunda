import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean;
  private url: string = environment.api;
  subRef$?: Subscription;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient

  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false
  }

  ngOnInit(): void {
  }

  ingresar() {
    let respuesta: any;
    const email = this.form.value.email;
    const password = this.form.value.password;

    const userLogin: ILogin = {
      email: email,
      password: password
    };

    this.subRef$ = this.http.post<IResponse>(`${this.url}/signin`, userLogin, { observe: 'response' })
      .subscribe(res => {
        respuesta = res.body
        localStorage.setItem('token', JSON.stringify(respuesta.token));
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          //ruta de dashboard
          this.router.navigate(['dashboard']);
        }, 2000);
      }, error => {
        this._snackBar.open('Error en usuario o contraseña', '', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackError']
        })
      }
    )
  }

  contact(){
    this.router.navigate(['contact']);
  }

  newUser(){
    console.log('new user');
  }


    ngOnDestroy() {
      if (this.subRef$) {
        this.subRef$.unsubscribe()
      }

    }

}
