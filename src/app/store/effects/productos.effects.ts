import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as productActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { Product } from 'src/app/models/Product';

@Injectable()
export class ProductsEffects {

    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(productActions.loadProducts),
        switchMap(() => this.apiService.getDataProducts().pipe(
                map((products: Product[]) => {
                    const offers = products.filter((offer) => Number(offer.discount) > 0);
                    const categories = [...new Set(products.map((d) => d.brand))];
                    return productActions.loadProductsSuccess({ products, offers, categories });
                }),
                catchError((error: Error) => of(productActions.loadProductsError({ payload: error })))
            ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService
    ) { }
}
