import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as reducerActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { Cart } from 'src/app/models/Cart';
import { GlobalService } from 'src/app/services/global/global.service';

@Injectable()
export class CartEffects {

    loadCart$ = createEffect(() => this.actions$.pipe(
        ofType(reducerActions.loadCart),
        switchMap((action) => this.apiService.getDataCart().pipe(
                map((cart: Cart) => reducerActions.loadCartSuccess({ cartProducts: cart.products, shipping: cart.shipping })),
                catchError((error: Error) => of(reducerActions.loadCartError({ payload: error })))
            ))
    )
    );

    addProduct$ = createEffect(() => this.actions$.pipe(
        ofType(reducerActions.addCartProduct),
        switchMap((action) => this.apiService.getDataCart().pipe(
                map((res) => {
                    this.globalService.showMessage('Producto agregado correctamente');
                    return reducerActions.addCartProductSuccess();
                }),
                catchError((error: Error) => {
                    this.globalService.showMessage('Ocurrió un error al agregar el producto');
                    return of(reducerActions.addCartProductError({ payload: error.message }));
                })
            ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService,
        public globalService: GlobalService,
    ) { }

}
