import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import { Error } from 'src/app/models/Error';
import * as fromProducts from '../actions/products.actions';

export const featureKey = 'products';

export interface State {
  products: Product[];
  loaded: boolean;
  hasError: boolean;
  loading: boolean;
  error: Error;
}

export const initialState: State = {
  products: [],
  loaded: false,
  hasError: false,
  loading: false,
  error: null
};

const productsReducer = createReducer(initialState,

  on(fromProducts.loadProducts, state => ({ ...state, loading: true })),

  // eslint-disable-next-line @typescript-eslint/no-shadow
  on(fromProducts.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    loaded: true,
    hasError: false,
    products,
  })),

  on(fromProducts.loadProductsError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    hasError: true,
    error: payload
  })),

  on(fromProducts.favoriteProduct, (state, { id }) => Object.assign({}, state, {
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

export const reducer = (state: State | undefined, action: Action) =>
productsReducer(state, action);

export const isLoading = (state: State) => state.loading;
export const succeeded = (state: State) => state.loaded;
export const hasError = (state: State) => state.hasError;
export const errorMessage = (state: State) => state.error;
export const products = (state: State) => state.products;
