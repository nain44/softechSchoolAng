import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IniSettingRoutingModule } from './ini-setting-routing.module';
import { AddSessionComponent } from './add-session/add-session.component';
import { AddStaffProfessionComponent } from './add-staff-profession/add-staff-profession.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddSectionsComponent } from './add-sections/add-sections.component';
import { AddClassesComponent } from './add-classes/add-classes.component';
import { AddTermComponent } from './add-term/add-term.component';


@NgModule({
  declarations: [AddSessionComponent, AddStaffProfessionComponent, AddStaffComponent, AddSubjectsComponent, AddSectionsComponent, AddClassesComponent, AddTermComponent],
  imports: [
    CommonModule,
    IniSettingRoutingModule
  ]
})
export class IniSettingModule { }
