import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductsFacade } from 'src/app/store/facades/products.facade';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, OnDestroy {
  productsSubscription = new Subscription();
  allFavorites: Product[] = [];
  isLoading$: Observable<boolean>;
  error: Error;
  constructor(
    private productsFacade: ProductsFacade
  ) {
  }

  ngOnInit() {
    this.productsSubscription.add(this.productsFacade.products$.subscribe(products => {
      this.allFavorites = products.filter((product) => product.is_favorite);
    }));

    this.isLoading$ = this.productsFacade.isLoading$;
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
