import { createAction, props } from '@ngrx/store';
import { Error } from 'src/app/models/Error';
import { Product } from 'src/app/models/Product';

export const enum ProductActionTypes {
  loadproducts = '[Products] Load All Products',
  loadproductssuccess = '[Products] Load Products Success',
  loadproductserror = '[Products] Load Products Error',
  favoriteproduct = '[Products] Favorite Product',
}

export const loadProducts = createAction(ProductActionTypes.loadproducts);

export const loadProductsSuccess = createAction(
  ProductActionTypes.loadproductssuccess,
  props<{ products: Product[]}>()
);

export const loadProductsError = createAction(
  ProductActionTypes.loadproductserror,
  props<{ payload: Error }>()
);

export const favoriteProduct = createAction(
    ProductActionTypes.favoriteproduct,
    props<{ id: number }>()
);
