import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false
  }

  ngOnInit(): void {
  }

  ingresar() {
    console.log(this.form)
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if (usuario === 'andy' && password === 'andy1234') {
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

}
