import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { DetailVehicleComponent } from './detail-vehicle/detail-vehicle.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
DetailVehicleComponent;

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'vehicles',
        component: VehiclesComponent,
        canActivate: [AuthGuard],
      },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      {
        path: 'detailVehicle',
        component: DetailVehicleComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
      {
        path: 'detailUser',
        component: DetailUserComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
