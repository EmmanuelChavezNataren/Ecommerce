import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/Product';
import { FunctionsService } from 'src/app/services/functions.service';
import { CartFacade } from 'src/app/store/facades/cart.facade';
import { ProductsFacade } from 'src/app/store/facades/products.facade';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  product: Product;
  colorSelected: number;
  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public functions: FunctionsService,
    private productsFacade: ProductsFacade,
    private cartFacade: CartFacade
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.product = JSON.parse(params.item);
      if (this.product.colors && this.product.colors.length > 0) {
        this.colorSelected = this.product.colors[0].name;
      }
    });
  }

  getRealPrice(price: number, discount: number) {
    return +price - +discount;
  }

  setColor(color: number) {
    this.colorSelected = color;
  }

  closeCart() {
    this.navCtrl.pop();
  }

  setFavorite() {
    this.product.is_favorite = !this.product.is_favorite;
    this.productsFacade.setFavoriteProduct(this.product.id);
  }

  addToCart(product: Product) {
    product.colors.map(color => {
      if (color.name === this.colorSelected) {
        product.color = {
          name: color.name,
          hex: color.hex,
        };
      }
    });
    const cartProduct = Object.assign({ color: product.color }, product);
    delete cartProduct.colors;
    this.cartFacade.addProductToCart(cartProduct);
    this.functions.showToastMessage('Producto agregado correctamente');
  }

}
