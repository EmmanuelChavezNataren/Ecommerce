import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/Product';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/User';
import { IonSlides } from '@ionic/angular';
import { ProductsFacade } from '../../store/facades/products.facade';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
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

  isLoading$: Observable<boolean>;
  error: Error;
  productsSubscription: Subscription;
  constructor(
    private productsFacade: ProductsFacade,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.getUserData();
    this.productsSubscription = this.productsFacade.products$.subscribe(products => {
      this.allProducts = products;
      this.allOffers = products.filter((offer) => Number(offer.discount) > 0);
    });
    this.isLoading$ = this.productsFacade.isLoading$;
    this.productsFacade.loadProducts();
  }

  async getUserData(){
    this.user = await this.storage.getDataObject('user');
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
