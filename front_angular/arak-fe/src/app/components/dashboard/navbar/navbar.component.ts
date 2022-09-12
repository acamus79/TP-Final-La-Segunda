import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  name = localStorage.getItem('user');
  role = localStorage.getItem('role');

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
