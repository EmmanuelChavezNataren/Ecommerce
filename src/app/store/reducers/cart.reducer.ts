/* eslint-disable @typescript-eslint/no-shadow */
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import * as fromCart from '../actions/cart.actions';

export const featureKey = 'cart';

export interface State {
    shipping: string;
    cartProducts: Product[];
    loaded: boolean;
    hasError: boolean;
    loading: boolean;
    error: Error;
};

export const initialState: State = {
    shipping: null,
    cartProducts: [],
    loaded: false,
    hasError: false,
    loading: false,
    error: null
};

const cartReducer = createReducer(initialState,

    on(fromCart.loadCart, state => ({ ...state, loading: true })),

    on(fromCart.loadCartSuccess, (state, { cartProducts, shipping }) => ({
        ...state,
        loading: false,
        loaded: true,
        cartProducts,
        shipping
    })),

    on(fromCart.loadCartError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

    on(fromCart.addCartProduct, (state, { cartProduct }) => ({
        ...state,
        cartProducts: [...state.cartProducts, cartProduct]
    })),

    on(fromCart.deleteProduct, (state, { payload }) => ({
        ...state,
        cartProducts: [...state.cartProducts.slice(0, payload), ...state.cartProducts.slice(payload + 1)],
    })),

);

export const reducer = (state: State | undefined, action: Action) =>
    cartReducer(state, action);

export const isLoading = (state: State) => state.loading;
export const succeeded = (state: State) => state.loaded;
export const hasError = (state: State) => state.hasError;
export const errorMessage = (state: State) => state.error;
export const cartproducts = (state: State) => state.cartProducts;
export const shipping = (state: State) => state.shipping;
