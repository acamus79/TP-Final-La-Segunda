import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DetailVehicleComponent } from './detail-vehicle/detail-vehicle.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { RepairComponent } from './repair/repair.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UsersComponent,
    VehiclesComponent,
    NavbarComponent,
    SideBarComponent,
    DetailUserComponent,
    DetailVehicleComponent,
    RepairComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
