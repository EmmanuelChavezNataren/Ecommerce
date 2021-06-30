import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/Product';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
    '[Products] Load Products Success',
    props<{ products: Product[]; offers: Product[]; categories: any[] }>()
);

export const loadProductsError = createAction(
    '[Products] Load Products Error',
    props<{ payload: Error }>()
);

export const favoriteProduct = createAction(
    '[Products] Favorite Product',
    props<{ id: number }>()
);
