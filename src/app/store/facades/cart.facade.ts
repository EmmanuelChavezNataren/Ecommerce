import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Product } from 'src/app/models/Product';
import * as CartActions from '../actions/cart.actions';
import { addCartProduct, deleteProduct } from '../actions/cart.actions';
import * as fromCartReducer from '../reducers/cart.reducer';
import * as fromCartSelector from '../selectors/cart.selector';

@Injectable()
export class CartFacade {

    constructor(private store: Store<fromCartReducer.State>) { }

    get isLoading$(): Observable<boolean> {
        return this.store.select(fromCartSelector.getIsLoading);
    }
    get succeeded$(): Observable<boolean> {
        return this.store.select(fromCartSelector.getSucceeded);
    }
    get hasError$(): Observable<boolean> {
        return this.store.select(fromCartSelector.getHasError).pipe(filter((x) => x));
    }
    get error$(): Observable<any> {
        return this.store
            .select(fromCartSelector.getErrorMessage);
    }
    get cartProducts$(): Observable<Product[]> {
        return this.store.select(fromCartSelector.getCartProducts).pipe(filter((x) => !!x));
    }
    get cartShipping$(): Observable<string> {
        return this.store.select(fromCartSelector.getShipping);
    }

    loadCart() {
        this.store.dispatch(CartActions.loadCart());
    }

    addProductToCart(product: Product) {
        this.store.dispatch(addCartProduct({ cartProduct: product }));
    }

    removeProductfromCart(index: number) {
        this.store.dispatch(deleteProduct({ payload: index }));
    }

}
