import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/Product';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/store/app.reducers';
import { loadProducts } from '../store/actions';
import { filter } from 'rxjs/operators';
import { User } from '../models/User';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  @ViewChild('slideNav', { static: false }) slideNav: IonSlides;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1.6,
    loop: true,
    centeredSlides: true,
    spaceBetween: 5
  };
  allOffers: Product[] = [];
  allProducts: Product[] = [];
  user: User;

  isLoading: boolean;
  error: Error;
  userSubscription: Subscription;
  productsSubscription: Subscription;
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.allProducts = [];
    this.allOffers = [];
    this.productsSubscription = this.store.select('products')
      .subscribe(({ products, offers, loading, error }) => {
        this.allProducts = products;
        this.allOffers = offers;
        this.isLoading = loading;
        this.error = error;
      });

    this.userSubscription = this.store.select('user')
      .pipe(
        filter(userLogin => userLogin.user != null)
      )
      .subscribe(({ user }) => {
        this.user = user;
      });
    this.store.dispatch(loadProducts());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.productsSubscription.unsubscribe();
  }
}
