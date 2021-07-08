import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartFacade } from 'src/app/store/facades/cart.facade';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
})
export class MyCartComponent implements OnInit, OnDestroy {
  cartProducts: number;
  subscriptionCart: any;
  constructor(
    private cartFacade: CartFacade,
  ) { }

  public ngOnInit(){
    this.subscriptionCart = this.cartFacade.cartProducts$.subscribe(products => {
      this.cartProducts = products.length;
    });
  }

  public ngOnDestroy(){
    this.subscriptionCart.unsubscribe();
  }

}
