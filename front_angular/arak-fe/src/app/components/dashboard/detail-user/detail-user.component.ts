import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css'],
})
export class DetailUserComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 4, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 2, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 2, rows: 2, color: 'lightpink' },
  ];
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
