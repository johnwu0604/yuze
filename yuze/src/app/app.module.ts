import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MenuModule } from './menu/menu.module';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';


import { RecordRTCComponent } from './record-rtc/record-rtc.component';
import {LoginComponent} from "./login/login.component";


@NgModule({
  declarations: [
    AppComponent,
    RecordRTCComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    MenuModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
