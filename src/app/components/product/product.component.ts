import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { favoriteProduct } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() skeleton: boolean;
  @Input() allowReveal: boolean;
  productReveal: number;
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() { }

  getRealPrice(price, discount) {
    return Number(price) - Number(discount);
  }

  showActions(id) {
    this.productReveal = id;
  }

  hideActions() {
    this.productReveal = null;
  }

  setFavorite() {
    this.hideActions();
  }

  addToCart() {
    this.hideActions();
  }

}
