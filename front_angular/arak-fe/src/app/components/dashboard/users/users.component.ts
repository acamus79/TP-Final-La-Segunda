import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  colum = [
    "id",
    "name",
    "email",
    "phone",
    "role",
    "actions"
  ];

  displayedColumns: string[] = this.colum;
  dataSource: MatTableDataSource<any> = new MatTableDataSource( [] as any[])

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUser$()
        .subscribe( (res: any) => {
          console.log(res)
          this.dataSource.data = res.body.data;
          console.log(this.dataSource)
        })

    

  }
  

  postUser() {
    const x = { 
      name: "Mariano",
      email: "mariano@mail.com",
      password: "1234567"
    } 

    this.userService.addUser$(x).subscribe( { next: ( res:any) => {
        this.dataSource.data = [...this.dataSource.data , res.body]
    }} );
    /* this.userService.getUser$()
        .subscribe( (res: any) => {
          console.log(res)
          this.dataSource = res.body.data;
          console.log(this.dataSource)
        }) */
  }

  ngOnDestroy(): void {
    console.log('hago algo')
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }



}
