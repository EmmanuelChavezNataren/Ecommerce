import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as fromCart from '../../store/reducers/cart.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../../store/effects/products.effects';
import { CartEffects } from 'src/app/store/effects/cart.effects';
import { ProductsFacade } from '../../store/facades/products.facade';
import { CartFacade } from '../../store/facades/cart.facade';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ComponentsModule,
    PipesModule,
    StoreModule.forFeature(fromCart.featureKey, fromCart.reducer),
    StoreModule.forFeature(fromProducts.featureKey, fromProducts.reducer),
    EffectsModule.forFeature([ProductsEffects, CartEffects]),
  ],
  declarations: [HomePage],
  providers: [ProductsFacade, CartFacade]
})
export class HomePageModule {}
