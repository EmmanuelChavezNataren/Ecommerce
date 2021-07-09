import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import { Error } from 'src/app/models/Error';
import { Product } from 'src/app/models/Product';
import { ApiService } from 'src/app/services/api.service';
import * as fromProduct from '../actions/products.actions';

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(fromProduct.loadProducts),
        switchMap(() => this.apiService.getDataProducts().pipe(
            map((products: Product[]) => fromProduct.loadProductsSuccess({ products })),
            catchError((error: Error) => of(fromProduct.loadProductsError({ payload: error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService
    ) { }
}
