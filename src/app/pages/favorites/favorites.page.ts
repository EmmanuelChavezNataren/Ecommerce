import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { GlobalService } from 'src/app/services/global/global.service';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit, OnDestroy {
  productsSubscription: Subscription;
  allFavorites: Product[] = [];
  isLoading: boolean;
  error: Error;
  constructor(
    private store: Store<AppState>,
    public globalService: GlobalService
    ) {
  }

  ngOnInit() {
    this.allFavorites = [];
    this.productsSubscription = this.store.select('products')
    .subscribe(({ products, loading, error }) => {
      this.allFavorites = products.filter((product) => product.is_favorite );
      this.isLoading = loading;
      this.error = error;
    });
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
