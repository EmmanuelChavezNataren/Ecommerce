import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromUser from '../../store/reducers/user.reducer';
import { UserEffects } from './../../store/effects/user.effects';
import { UserFacade } from 'src/app/store/facades/user.facade';
import { PipesModule } from 'src/app/pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromUser.featureKey, fromUser.reducer),
    EffectsModule.forFeature([UserEffects])
  ],
  declarations: [LoginPage],
  providers: [UserFacade]
})
export class LoginPageModule { }
