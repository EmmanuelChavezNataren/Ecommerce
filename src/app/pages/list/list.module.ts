import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListPage } from './list.page';

import { ListPageRoutingModule } from './list-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../../store/effects/products.effects';
import * as fromProducts from '../../store/reducers/products.reducer';
import { ProductsFacade } from '../../store/facades/products.facade';
import { CartFacade } from 'src/app/store/facades/cart.facade';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    ListPageRoutingModule,
    StoreModule.forFeature(fromProducts.featureKey, fromProducts.reducer),
    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [ListPage],
  providers: [ProductsFacade, CartFacade]
})
export class ListPageModule { }
