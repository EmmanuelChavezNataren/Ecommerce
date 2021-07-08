import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { FunctionsService } from 'src/app/services/functions.service';
import { addCartProduct } from 'src/app/store/actions/cart.actions';
import { favoriteProduct } from 'src/app/store/actions/products.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() skeleton: boolean;
  @Input() showProductOptions: boolean;
  selectedProduct: number;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    public functions: FunctionsService,
  ) { }

  ngOnInit() { }

  getRealPrice(price, discount) {
    return Number(price) - Number(discount);
  }

  showActions(id) {
    this.selectedProduct = id;
  }

  hideActions() {
    this.selectedProduct = null;
  }

  setFavorite() {
     this.store.dispatch(favoriteProduct({ id: this.product.id }));
     this.hideActions();
  }

  addToCart() {
    const color = {
      name: this.product.colors[0].name,
      hex: this.product.colors[0].hex,
    };
    const productCart = Object.assign({ color }, this.product);
    delete productCart.colors;
    this.store.dispatch(addCartProduct({ cartProduct: productCart }));
    this.functions.showMessage('Producto agregado correctamente');
    this.hideActions();
  }

  detail() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        item: JSON.stringify(this.product),
      }
    };
    this.router.navigate(['/detail'], navigationExtras);
  }

}
