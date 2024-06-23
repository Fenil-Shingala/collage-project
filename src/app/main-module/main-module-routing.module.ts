import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleComponent } from './main-module.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuardGuard } from '../guard/auth-guard.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FuelComponent } from './fuel/fuel.component';
import { MechanicComponent } from './mechanic/mechanic.component';
import { DroppingComponent } from './dropping/dropping.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainModuleComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'fuel', component: FuelComponent },
      { path: 'mechanic', component: MechanicComponent },
      { path: 'dropping', component: DroppingComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
    canActivate: [authGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainModuleRoutingModule {}
