//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MenuModule } from './menu/menu.module';
import { LoginModule } from './login/login.module';

//components
import { AppComponent } from './app.component';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';
import { LoginComponent} from "./login/login.component";
import { CheckoutComponent } from './checkout/checkout.component';


import { routing } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    RecordRTCComponent,
    LoginComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    ButtonsModule.forRoot(),
    MenuModule,
    LoginModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
