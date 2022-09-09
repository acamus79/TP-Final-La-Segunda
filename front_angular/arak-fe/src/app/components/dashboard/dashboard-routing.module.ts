import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DetailVehicleComponent } from './detail-vehicle/detail-vehicle.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
DetailVehicleComponent

const routes: Routes = [
  { path: '', component: DashboardComponent,
      children: [
        {path: '', component: HomeComponent},
        {path: 'users', component: UsersComponent},
        {path: 'vehicles', component:VehiclesComponent},
        {path: 'users', component: UsersComponent},
        {path: 'detail', component: DetailVehicleComponent},

      ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
