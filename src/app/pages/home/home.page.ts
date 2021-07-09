import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/Product';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/User';
import { IonSlides } from '@ionic/angular';
import { ProductsFacade } from '../../store/facades/products.facade';
import { StorageService } from '../../services/storage.service';
import { CartFacade } from 'src/app/store/facades/cart.facade';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('slideNav', { static: false }) slideNav: IonSlides;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true,
    spaceBetween: 5
  };
  allOffers: Product[] = [];
  allProducts: Product[] = [];
  totalProducts: number;
  user: User;

  isLoading$: Observable<boolean>;
  error: Error;
  subscriptions = new Subscription();
  constructor(
    private productsFacade: ProductsFacade,
    private cartFacade: CartFacade,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.getUserData();

    this.subscriptions.add(this.productsFacade.products$.subscribe(products => {
      this.allProducts = products;
      this.allOffers = products.filter((offer) => Number(offer.discount) > 0);
    }));

    this.subscriptions.add(this.cartFacade.cartProducts$.subscribe(products => {
      this.totalProducts = products.length;
    }));

    this.isLoading$ = this.productsFacade.isLoading$;
    this.productsFacade.loadProducts();
    this.cartFacade.loadCart();
  }

  async getUserData(){
    this.user = await this.storage.getDataObject('user');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
