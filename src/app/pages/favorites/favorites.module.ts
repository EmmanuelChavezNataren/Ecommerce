import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavoritesPage } from './favorites.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromProducts from '../../store/reducers/products.reducer';
import { ProductsEffects } from '../../store/effects/products.effects';
import { ProductsFacade } from '../../store/facades/products.facade';
import { CartFacade } from 'src/app/store/facades/cart.facade';
const routes: Routes = [
  {
    path: '',
    component: FavoritesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    IonicModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromProducts.featureKey, fromProducts.reducer),
    EffectsModule.forFeature([ProductsEffects])
  ],
  declarations: [FavoritesPage],
  providers: [ProductsFacade, CartFacade]
})
export class FavoritesPageModule {}
