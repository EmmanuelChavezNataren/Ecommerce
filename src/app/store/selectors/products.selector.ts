import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromProduct from '../reducers/products.reducer';

const getState = createFeatureSelector<fromProduct.State>(
    fromProduct.featureKey
);

const getPageState = createSelector(getState, (state) => state);

export const getIsLoading = createSelector(getPageState, fromProduct.isLoading);
export const getSucceeded = createSelector(getPageState, fromProduct.succeeded);
export const getHasError = createSelector(getPageState, fromProduct.hasError);
export const getErrorMessage = createSelector(getPageState, fromProduct.errorMessage);
export const getProducts = createSelector(getPageState, fromProduct.products);
