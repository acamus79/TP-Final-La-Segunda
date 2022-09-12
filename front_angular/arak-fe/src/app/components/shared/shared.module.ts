import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Modulos */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { DialogDeleteVehicleComponent } from './dialog-delete-vehicle/dialog-delete-vehicle.component';

/* Material angular modules */
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogGenComponent } from './dialog-gen/dialog-gen.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DialogGenComponent,
    DialogAddUserComponent,
    DialogDeleteVehicleComponent,
  ],
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
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class SharedModule {}
