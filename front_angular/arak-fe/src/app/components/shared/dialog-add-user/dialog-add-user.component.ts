import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css'],
})
export class DialogAddUserComponent implements OnInit {
  form: FormGroup;
  message: string = 'Hola Mundo!';
  user: any;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loading = false;
  }

  ngOnInit(): void {}

  addUser() {
    let respuesta: any;
    this.user = this.form.value;
    this.userService.addUser$(this.user).subscribe((res: any) => {
      respuesta = res.body;
      localStorage.setItem('token', respuesta.data.token);
      localStorage.setItem('user', respuesta.data.email);
      localStorage.setItem('role', respuesta.data.role);
      if (respuesta.status != 200) {
        this._snackBar.open('Usuario o contraseña incorrectos', '', {
          duration: 2000,
          panelClass: ['snackError'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      } else {
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
      }
    });
  }
}
