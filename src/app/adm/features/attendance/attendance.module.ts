import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { ClassAttendanceComponent } from './class-attendance/class-attendance.component';
import { StaffAttendanceComponent } from './staff-attendance/staff-attendance.component';


@NgModule({
  declarations: [ClassAttendanceComponent, StaffAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
