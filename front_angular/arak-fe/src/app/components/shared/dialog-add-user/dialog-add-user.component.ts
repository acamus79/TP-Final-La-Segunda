import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.css']
})
export class DialogAddUserComponent implements OnInit {
  form: FormGroup;
  message: string = "Hola Mundo!"
  user:any;

  @Output() miEvento = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addUser() {
    this.user = this.form.value
    console.log(this.form.value)
    this.userService.addUser$(this.user).subscribe(
      /* {
        complete: () => {console.log('Cuando termina')}
      } */
    )
  }

}
