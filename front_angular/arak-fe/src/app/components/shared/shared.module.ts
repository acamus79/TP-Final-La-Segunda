import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modulos */
import { ReactiveFormsModule } from '@angular/forms';

/* Material angular modules */
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule

  ],
  exports: [
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule
  ]
})
export class SharedModule { }
