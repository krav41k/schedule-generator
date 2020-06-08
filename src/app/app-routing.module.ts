import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ScheduleKitComponent} from './schedule-kit/schedule-kit.component';
import {ScheduleTableComponent} from './schedule-table/schedule-table.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'schedule-kit/:id', component: ScheduleKitComponent},
  {path: 'schedule/:id', component: ScheduleTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
