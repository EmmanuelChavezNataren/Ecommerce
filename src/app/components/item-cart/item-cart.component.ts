import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartFacade } from 'src/app/store/facades/cart.facade';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss'],
})
export class ItemCartComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor(
    private cartFacade: CartFacade
    ) { }

  ngOnInit() {}

  getRealCost(price: number, discount: number) {
    return +price-+discount;
  }

  removeProduct() {
    this.cartFacade.removeProductfromCart(this.index);
  }

}
