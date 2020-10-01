import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmComponent } from './adm/adm.component';

const routes: Routes = [
{
    path: '',
    component: AdmComponent,
    children: [
{ path: '', redirectTo: 'dashboard' },
{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
{ path: 'transaction', loadChildren: () => import('./features/transaction/transaction.module').then(m => m.TransactionModule) }, 
{ path: 'exam', loadChildren: () => import('./features/exam/exam.module').then(m => m.ExamModule) }, 
{ path: 'payment', loadChildren: () => import('./features/payment/payment.module').then(m => m.PaymentModule) },
{ path: 'sms', loadChildren: () => import('./features/sms/sms.module').then(m => m.SmsModule) },
{ path: 'attendance', loadChildren: () => import('./features/attendance/attendance.module').then(m => m.AttendanceModule) }, 
{ path: 'manageStudents', loadChildren: () => import('./features/manage-students/manage-students.module').then(m => m.ManageStudentsModule) },
{ path: 'inisetting', loadChildren: () => import('./features/ini-setting/ini-setting.module').then(m => m.IniSettingModule) },

]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
