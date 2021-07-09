import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import * as fromProductsActions from '../actions/products.actions';
import { favoriteProduct } from '../actions/products.actions';
import * as fromProductsReducer from '../reducers/products.reducer';
import * as fromProductsSelector from '../selectors/products.selector';

@Injectable()
export class ProductsFacade {

    constructor(private store: Store<fromProductsReducer.State>) { }

    get isLoading$(): Observable<boolean> {
        return this.store.select(fromProductsSelector.getIsLoading);
    }
    get succeeded$(): Observable<boolean> {
        return this.store.select(fromProductsSelector.getSucceeded);
    }
    get hasError$(): Observable<boolean> {
        return this.store.select(fromProductsSelector.getHasError).pipe(filter((x) => x));
    }
    get error$(): Observable<any> {
        return this.store
            .select(fromProductsSelector.getErrorMessage);
    }
    get products$(): Observable<Product[]> {
        return this.store.select(fromProductsSelector.getProducts).pipe(filter((x) => !!x));
    }

    loadProducts() {
        this.store.dispatch(fromProductsActions.loadProducts());
    }

    setFavoriteProduct(id: number) {
        this.store.dispatch(favoriteProduct({ id }));
    }
}
