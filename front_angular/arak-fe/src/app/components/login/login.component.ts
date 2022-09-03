import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api/api.service';
import { LoginI } from 'src/app/models/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private api: ApiService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false
  }

  ngOnInit(): void {
  }

  ingresar(form:LoginI) {
    console.log(this.form)
    const email = this.form.value.email;
    const password = this.form.value.password;

    this.api.login(form).subscribe(data => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

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
    }

  }

  error() {
    this._snackBar.open('Usuario o contraseña invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
 */
}
