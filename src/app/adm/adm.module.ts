import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmRoutingModule } from './adm-routing.module';
import {SharedModule} from '../core';
import { AdmComponent } from './adm/adm.component';



@NgModule({
  declarations: [AdmComponent],
  imports: [
    CommonModule,
    AdmRoutingModule,
    SharedModule
  
  ],
  providers: [],
  bootstrap: [AdmComponent]
})
export class AdmModule { }
