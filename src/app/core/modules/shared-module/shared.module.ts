import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidrbarComponent } from './sidrbar/sidrbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [NavComponent, FooterComponent,HeaderComponent, SidrbarComponent ],
  exports: [NavComponent, FooterComponent, HeaderComponent, SidrbarComponent ]
})

export class SharedModule { }
