import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  flagEdit?: boolean = false;
  disable?: boolean;
  btnEdit?: Boolean = false;
  user = {
    id: 1,
    name: 'Usuario',
    email: 'alopezcio@gmail.com',
    phone: '341556667',
    role: 'Admin',
  };

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.flagEdit = this.userService.getUserEditFlag();
    this.disable = this.flagEdit;
  }

  ngOnInit(): void {
    this.userService.getUserById().subscribe((res: any) => {
      this.user = res.body.data;
    });
  }

  enableEditUser() {
    this.userService.setUserEditFlag$(true);
  }

  editUser() {
    const userChange = this.user;
    if (this.form.value.name != '') {
      userChange.name = this.form.value.name;
    }
    if (this.form.value.phone != '') {
      userChange.phone = this.form.value.phone;
    }
    this.userService.editUser$(userChange).subscribe(() => {
      this._snackBar.open('Usuario editado correctamente', '', {
        duration: 3000,
        panelClass: ['snackOk', 'snack'],
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }
}
