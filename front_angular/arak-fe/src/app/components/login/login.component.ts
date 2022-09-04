import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/models/ilogin';
import { IResponse } from 'src/app/models/iresponse';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  private url:string = environment.api 

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,

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
    const email = this.form.value.email;
    const password = this.form.value.password;

    const userLogin: ILogin = {
      email: email,
      password: password
    };


  /*   login(data:LoginI):Observable<ResponseI>{
      return this.http.post<ResponseI>(`${this.url}/signin`, data); */
  
    this.http.post<IResponse>(`${this.url}/signin`, userLogin, { observe: 'response' })
      .subscribe( res => {
        const token = res.body;
        console.log('token de porqueria', JSON.stringify(token));
        this.router.navigate(['dashboard']);
        sessionStorage.setItem('token', JSON.stringify(token))

      })

    /* if (usuario === 'andy' && password === 'andy1234') {
      //ingreso al dashboard
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //ruta de dashboard
        this.router.navigate(['dashboard']);
      }, 3000)
    } else {
      // mensaje de error
      this.error();
      this.form.reset();
    } */

  }

  error() {
    this._snackBar.open('Usuario o contraseña invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
