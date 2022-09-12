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
    private router: Router
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
    console.log('edit');
  }

  editUser() {
    this.userService.editUser$(this.form.value).subscribe();
  }
}
