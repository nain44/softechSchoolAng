import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClassAttendanceComponent} from './class-attendance/class-attendance.component';
import {StaffAttendanceComponent} from './staff-attendance/staff-attendance.component';

const routes: Routes = [{ path: '', redirectTo:'attendance'},
{ path: 'classAttendance', component: ClassAttendanceComponent },
{ path: 'staffAttendance', component: StaffAttendanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
