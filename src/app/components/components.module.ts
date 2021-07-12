import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ProductComponent } from './product/product.component';
import { SliderComponent } from './slider/slider.component';
import { ItemCartComponent } from './item-cart/item-cart.component';

const pages_components = [
  MyCartComponent,
  ProductComponent,
  SliderComponent,
  ItemCartComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    pages_components
  ],
  exports: [
    pages_components
  ],
  entryComponents: [],
})
export class ComponentsModule { }
