import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { FunctionsService } from 'src/app/services/functions.service';
import { addCartProduct } from 'src/app/store/actions/cart.actions';
import { favoriteProduct } from 'src/app/store/actions/products.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  product: Product;
  colorList = [];
  colorSelected: number;
  constructor(
    public navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    public functions: FunctionsService,
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

  getRealCost(price, discount) {
    return Number(price) - Number(discount);
  }

  setColor(color) {
    this.colorSelected = color;
  }

  closeCart() {
    this.navCtrl.pop();
  }

  setFavorite() {
    this.product.is_favorite = !this.product.is_favorite;
    this.store.dispatch(favoriteProduct({ id: this.product.id }));
  }

  addToCart(item) {
     item.colors.map( color => {
      if (color.name === this.colorSelected) {
        item.color =  {
          name: color.name,
          hex: color.hex,
        };
      }
    });
    const cartProduct = Object.assign({ color: item.color }, item);
    delete cartProduct.colors;
    this.store.dispatch(addCartProduct({ cartProduct }));
    this.functions.showMessage('Producto agregado correctamente');
  }

}
