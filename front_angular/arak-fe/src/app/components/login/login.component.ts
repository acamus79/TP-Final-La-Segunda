import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from 'src/app/models/ilogin';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../shared/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean;
  subRef$?: Subscription;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,

    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
  }

  ngOnInit(): void {}

  ingresar() {
    let respuesta: any;
    const email = this.form.value.email;
    const password = this.form.value.password;

    const userLogin: ILogin = {
      email: email,
      password: password,
    };

    this.authService.login$(userLogin).subscribe((res: any) => {
      respuesta = res.body;
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('user', respuesta.data.name);
      localStorage.setItem('role', respuesta.data.role);
      if (respuesta.status === 200) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          //ruta de dashboard
          this.router.navigate(['dashboard']);
        }, 2000);

        this._snackBar.open('Bienvenido', '', {
          duration: 4000,
          panelClass: ['snackOk', 'snack'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
        this._snackBar.open('Usuario o contraseña incorrectos', '', {
          duration: 2000,
          panelClass: ['snackError'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    });
  }

  contact() {
    this.router.navigate(['contact']);
  }

  newUser() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.dialog.closeAll();
      }
    });
  }

  ngOnDestroy() {
    if (this.subRef$) {
      this.subRef$.unsubscribe();
    }
  }
}
