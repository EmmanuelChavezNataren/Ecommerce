import { Action, ActionReducer, createReducer, on, State } from '@ngrx/store';
import { Product } from 'src/app/models/Product';
import * as ActionsCart from '../actions';

export interface CartState {
    shipping: string;
    cartProducts: Product[];
};

export const cartInitialState: CartState = {
    shipping: null,
    cartProducts: []
};

const cartReducer: ActionReducer<CartState> = createReducer(
    cartInitialState,

    on(ActionsCart.loadCart, state => ({ ...state, loading: true })),

    on(ActionsCart.loadCartSuccess, (state, { cartProducts, shipping }) => ({
        ...state,
        loading: false,
        loaded: true,
        cartProducts,
        shipping
    })),

    on(ActionsCart.loadCartError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

    on(ActionsCart.addCartProduct, (state, { cartProduct }) => ({
        ...state,
        cartProducts: [...state.cartProducts, cartProduct]
    })),

    on(ActionsCart.deleteProduct, (state, { payload }) => ({
        ...state,
        cartProducts: [...state.cartProducts.slice(0, payload), ...state.cartProducts.slice(payload + 1)],
    })),

);

export const cartreducer = (state: CartState | undefined, action: Action) =>
cartReducer(state, action);
