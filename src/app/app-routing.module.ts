import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { async } from 'rxjs/internal/scheduler/async';

const routes: Routes = [
  {path: '', loadChildren: async () => (await (import('./adm/adm.module'))).AdmModule},
  { path: 'signin', loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule) },
  // { path: 'dashboard', loadChildren:   async () => (await import('./adm//features/dashboard/dashboard.module')).DashboardModule }, 
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
