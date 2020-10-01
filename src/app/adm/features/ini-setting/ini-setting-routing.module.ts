import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSessionComponent } from './add-session/add-session.component';
import { AddClassesComponent } from './add-classes/add-classes.component';
import {AddSectionsComponent} from './add-sections/add-sections.component';
import {AddStaffComponent} from './add-staff/add-staff.component';
import {AddStaffProfessionComponent} from './add-staff-profession/add-staff-profession.component';
import {AddSubjectsComponent} from './add-subjects/add-subjects.component';
import {AddTermComponent} from './add-term/add-term.component'

const routes: Routes = [
  {path: '', redirectTo:'inisetting'},
  {path: 'AddSession', component: AddSessionComponent},
  {path: 'AddClasses', component: AddClassesComponent},
  {path: 'AddSections', component: AddSectionsComponent},
  {path: 'AddStaff', component: AddStaffComponent},
  {path: 'ASP', component: AddStaffProfessionComponent},
  {path: 'AddSubjects', component: AddSubjectsComponent},
  {path: 'AddTerm', component: AddTermComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class IniSettingRoutingModule { }
