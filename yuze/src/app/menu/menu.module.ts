import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MenuComponent, ItemComponent],
  exports: [MenuComponent, ItemComponent]
})
export class MenuModule { }
