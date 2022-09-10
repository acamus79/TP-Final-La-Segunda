import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  showFiller: boolean;
  isadmin: any = false
  ismannger: any = false

  constructor() {
    this.showFiller = true
  }

  ngOnInit(): void {
    this.isAdmin()
  }

  showSideBar() {
    this.showFiller = false
  }

  hideSideBar() {
    this.showFiller = true
  }

  isAdmin() {

    const role = localStorage.getItem('role');

    if (role == '1') {
      this.isadmin = true
    } else if(role == '3') {
      this.ismannger = true
    }else{
      this.isadmin = false
      this.ismannger = false
    }

  }

}
