import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: DashboardComponent,
      children: [
        {path: '', component: HomeComponent, pathMatch: 'full'},
        {path: 'users', component: UsersComponent, pathMatch: 'full'},
        {path: 'vehicles', component:VehiclesComponent, pathMatch: 'full'},
        {path: 'users', component: UsersComponent, pathMatch: 'full'},
        {path: 'contact', component: ContactComponent, pathMatch: 'full'},
      ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
