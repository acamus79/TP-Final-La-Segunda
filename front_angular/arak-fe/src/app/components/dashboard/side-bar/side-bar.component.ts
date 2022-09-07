import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  showFiller: boolean;
  expression: any = true

  constructor() {
    this.showFiller = true
  }

  ngOnInit(): void {
  }

  showSideBar() {
    this.showFiller = false
  }

}
