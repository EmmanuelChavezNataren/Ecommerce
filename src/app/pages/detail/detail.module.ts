import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DetailPage } from './detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

import * as fromProducts from '../../store/reducers/products.reducer';
import * as fromCart from '../../store/reducers/cart.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../../store/effects/products.effects';
import { CartEffects } from 'src/app/store/effects/cart.effects';
import { ProductsFacade } from '../../store/facades/products.facade';
import { CartFacade } from '../../store/facades/cart.facade';

const routes: Routes = [
  {
    path: '',
    component: DetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    StoreModule.forFeature(fromCart.featureKey, fromCart.reducer),
    StoreModule.forFeature(fromProducts.featureKey, fromProducts.reducer),
    EffectsModule.forFeature([ProductsEffects, CartEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [DetailPage],
  providers: [ProductsFacade, CartFacade]
})
export class DetailPageModule { }
