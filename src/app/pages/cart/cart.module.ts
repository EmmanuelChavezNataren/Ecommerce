import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartPage } from './cart.page';

import { CartPageRoutingModule } from './cart-routing.module';
import { ComponentsModule } from '../../components/components.module';

import * as fromCart from '../../store/reducers/cart.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from 'src/app/store/effects/cart.effects';
import { CartFacade } from '../../store/facades/cart.facade';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    CartPageRoutingModule,
    StoreModule.forFeature(fromCart.featureKey, fromCart.reducer),
    EffectsModule.forFeature([CartEffects]),
  ],
  declarations: [CartPage],
  providers: [CartFacade]
})
export class CartPageModule { }
