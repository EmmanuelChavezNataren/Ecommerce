import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { deleteProduct } from 'src/app/store/actions/cart.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.scss'],
})
export class ItemCartComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor(
    private store: Store<AppState>,
    ) { }

  ngOnInit() {}

  getRealCost(price, discount) {
    return Number(price) - Number(discount);
  }

  removeProduct() {
    this.store.dispatch(deleteProduct({ payload: this.index }));
  }

}
