import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import * as ActionsProduct from '../actions';

export interface ProductsState {
  products: Product[];
  offers: Product[];
  categories: any[];
  loaded: boolean;
  loading: boolean;
  error: Error;
}

export const productsInitialState: ProductsState = {
  products: [],
  offers: [],
  categories: [],
  loaded: false,
  loading: false,
  error: null
};

const productsReducer = createReducer(productsInitialState,

  on(ActionsProduct.loadProducts, state => ({ ...state, loading: true })),

  on(ActionsProduct.loadProductsSuccess, (state, { products, offers, categories }) => ({
    ...state,
    loading: false,
    loaded: true,
    products: [...products],
    offers: [...offers],
    categories: [...categories]
  })),

  on(ActionsProduct.loadProductsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload
  })),

  on(ActionsProduct.favoriteProduct, (state, { id }) => Object.assign({}, state, {
      products: state.products.map(producto => {
        if (producto.id === id) {
          return {
            ...producto,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            is_favorite: !producto.is_favorite
          };
        }
        return producto;
      })
    })),

);

export const productsreducer = (state: ProductsState | undefined, action: Action) =>
productsReducer(state, action);
