import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { FunctionsService } from 'src/app/services/functions.service';
import { CartFacade } from 'src/app/store/facades/cart.facade';
import { ProductsFacade } from 'src/app/store/facades/products.facade';

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
    public functions: FunctionsService,
    private productsFacade: ProductsFacade,
    private cartFacade: CartFacade
  ) { }

  ngOnInit() { }

  getRealPrice(price: number, discount: number) {
    return +price - +discount;
  }

  showActions(id: number) {
    this.selectedProduct = id;
  }

  hideActions() {
    this.selectedProduct = null;
  }

  setFavorite() {
    this.productsFacade.setFavoriteProduct(this.product.id);
    this.hideActions();
  }

  addToCart() {
    const color = {
      name: this.product.colors[0].name,
      hex: this.product.colors[0].hex,
    };
    const productCart = Object.assign({ color }, this.product);
    delete productCart.colors;

    this.cartFacade.addProductToCart(productCart);
    this.functions.showToastMessage('Producto agregado correctamente');
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
