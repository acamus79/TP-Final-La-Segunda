import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {}
}
