import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutComponent } from './checkout/checkout.component'


const appRoutes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'menu', component: MenuComponent },
  { path: 'checkout', component: CheckoutComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
