import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartFacade } from '../../store/facades/cart.facade';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit, OnDestroy {
  subscriptionCart: any;
  subscriptionShipping: any;
  total = 0;
  subtotal = 0;
  shipping = 0;
  allProducts: any = [];
  isExpanded: boolean;
  isLoading$: Observable<boolean>;

  constructor(
    private cartFacade: CartFacade,
  ) { }

  ngOnInit() {
    this.allProducts = [];
    this.subscriptionCart = this.cartFacade.cartProducts$.subscribe(products => {
      this.allProducts = [];
      this.allProducts = products;
      this.refreshTotal();
    });

    this.isLoading$ = this.cartFacade.isLoading$;

    this.subscriptionShipping = this.cartFacade.cartShipping$.subscribe(shipping => {
      this.shipping = Number(shipping);
    });

  }

  ngOnDestroy(){
    this.subscriptionCart.unsubscribe();
    this.subscriptionShipping.unsubscribe();
  }

  revealDetail() {
    this.isExpanded = !this.isExpanded;
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
