import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SigninModule} from './signin/signin.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SigninModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
