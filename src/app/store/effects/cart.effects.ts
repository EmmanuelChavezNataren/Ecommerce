import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

import { Error } from 'src/app/models/Error';
import { Cart } from 'src/app/models/Cart';
import * as fromCart from '../actions/cart.actions';

@Injectable()
export class CartEffects {

    loadCart$ = createEffect(() => this.actions$.pipe(
        ofType(fromCart.loadCart),
        switchMap(() => this.apiService.getDataCart().pipe(
                map((cart: Cart) => fromCart.loadCartSuccess({ cartProducts: cart.products, shipping: cart.shipping })),
                catchError((error: Error) => of(fromCart.loadCartError({ payload: error })))
            ))
    ));

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(fromCart.addCartProduct),
        switchMap(() => this.apiService.getDataCart().pipe(
                map(() => fromCart.addCartProductSuccess()),
                catchError((error: Error) => of(fromCart.addCartProductError({ payload: error })))
            ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService,
    ) { }

}
