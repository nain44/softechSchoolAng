import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SigninDirective } from './signin.directive';


@NgModule({
  declarations: [SigninComponent, SigninDirective],
  imports: [
    CommonModule,
    SigninRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[SigninComponent]

})
export class SigninModule { }



