import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CartFacade } from '../../store/facades/cart.facade';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit, OnDestroy {
  cartSubscription = new Subscription();
  total = 0;
  subtotal = 0;
  shipping = 0;
  allProducts: Product[] = [];
  showDetail: boolean;
  isLoading$: Observable<boolean>;

  constructor(
    private cartFacade: CartFacade,
  ) { }

  ngOnInit() {
    this.allProducts = [];

    this.cartSubscription.add(this.cartFacade.cartProducts$.subscribe(products => {
      this.allProducts = [];
      this.allProducts = products;
      this.refreshTotal();
    }));

    this.isLoading$ = this.cartFacade.isLoading$;

    this.cartSubscription.add(this.cartFacade.cartShipping$.subscribe(shipping => {
      this.shipping = Number(shipping);
    }));

  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  showPaymentDetail() {
    this.showDetail = !this.showDetail;
  }

  refreshTotal() {
    this.total = 0;
    this.subtotal = 0;
    this.allProducts.map(product => {
      this.subtotal += (Number(product.discount) > 0)
        ? (Number(product.product_price) - Number(product.discount))
        : Number(product.product_price);
    });
    this.total = Number(this.subtotal) + Number(this.shipping);
  }

}
