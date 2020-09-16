import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageStudentsComponent } from './manage-students.component';

const routes: Routes = [{ path: '', component: ManageStudentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStudentsRoutingModule { }
