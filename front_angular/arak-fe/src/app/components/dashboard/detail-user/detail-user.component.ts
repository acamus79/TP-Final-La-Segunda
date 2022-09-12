import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  flagEdit?: boolean;
  disable?: boolean;
  btnEdit?: Boolean = false;
  users: any = [
    {
      id: 1,
      name: 'andres',
      mail: 'alopezcio@gmail.com',
      phone: 32423434,
      role: 'Admin',
    },
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({});
    this.flagEdit = this.userService.getUserEditFlag();
    this.disable = this.flagEdit;
  }

  ngOnInit(): void {}

  enableEditUser() {
    this.userService.setUserEditFlag$(true);
    console.log('edit');
  }

  editUser() {
    console.log('endpont');
  }
}
