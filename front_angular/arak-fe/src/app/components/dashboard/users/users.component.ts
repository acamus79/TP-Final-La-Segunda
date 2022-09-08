import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

export interface IReqUser {
  status: number;
  data:   ReqUser[];
}

export interface ReqUser {
  id:           number;
  name:         string;
  password:     string;
  email:        string;
  phone:        null;
  resetToken:   null;
  refreshToken: null;
  createdAt:    Date;
  updatedAt:    Date;
  role:         number;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser$()
        .subscribe( (res: any) => {
          console.log(res.data)
        })

  }

}
