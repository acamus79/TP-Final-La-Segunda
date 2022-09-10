import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IReqUser, ReqUser } from 'src/app/models/iusuario';
import { UserService } from 'src/app/services/user/user.service';
import { DialogAddUserComponent } from '../../shared/dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  template: `message: <app-dialog-add-user></app-dialog-add-user>`,
})
export class UsersComponent implements OnInit, OnDestroy {
  m: number = 0;
  suscription?: Subscription;
  message: string = '';
  @ViewChild(DialogAddUserComponent) child: any;

  colum = ['id', 'name', 'email', 'role', 'actions'];

  displayedColumns: string[] = this.colum;
  dataSource: MatTableDataSource<ReqUser> = new MatTableDataSource(
    [] as ReqUser[]
  );

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();

    this.suscription = this.userService.refresh$.subscribe(() => {
      this.getUsers();
    });
  }

  getUsers(): void {
    this.userService.getUser$().subscribe((res: any) => {
      console.log(res);
      this.dataSource.data = res.body.data;
      console.log('esto se eejecuta otra vez');
    });
  }

  openDialogAddUser() {
    this.dialog.open(DialogAddUserComponent);
  }

  ngOnDestroy(): void {}
}
