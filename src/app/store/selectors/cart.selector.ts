import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCart from '../reducers/cart.reducer';

const getState = createFeatureSelector<fromCart.State>(
    fromCart.featureKey
);

const getPageState = createSelector(getState, (state) => state);

export const getIsLoading = createSelector(getPageState, fromCart.isLoading);
export const getSucceeded = createSelector(getPageState, fromCart.succeeded);
export const getHasError = createSelector(getPageState, fromCart.hasError);
export const getErrorMessage = createSelector(getPageState, fromCart.errorMessage);
export const getCartProducts = createSelector(getPageState, fromCart.cartproducts);
export const getShipping = createSelector(getPageState, fromCart.shipping);
