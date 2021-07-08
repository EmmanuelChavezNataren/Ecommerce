import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../../components/components.module';

import * as fromUser from '../../store/reducers/user.reducer';
import * as fromProducts from '../../store/reducers/products.reducer';
import { UserEffects } from '../../store/effects/user.effects';
import { UserFacade } from 'src/app/store/facades/user.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from '../../store/effects/products.effects';
import { ProductsFacade } from '../../store/facades/products.facade';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ComponentsModule,
    PipesModule,
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
    StoreModule.forFeature(fromProducts.featureKey, fromProducts.reducer),
    EffectsModule.forFeature([UserEffects, ProductsEffects])
  ],
  declarations: [HomePage],
  providers: [UserFacade, ProductsFacade]
})
export class HomePageModule {}
