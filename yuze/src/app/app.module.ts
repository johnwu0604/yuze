//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { MenuModule } from './menu/menu.module';
import { HttpModule } from '@angular/http'
import { LoginModule } from './login/login.module';

//components
import { AppComponent } from './app.component';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';
import { LoginComponent} from "./login/login.component";
import { CheckoutComponent } from './checkout/checkout.component';

//services
import { MenuService } from './menu/menu.service';


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
    HttpModule,
    routing
  ],
  providers: [
    MenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
