import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from '../reducers/user.reducer';

const getState = createFeatureSelector<fromUser.State>(
    fromUser.featureKey
);

const getPageState = createSelector(getState, (state) => state);

export const getIsLoading = createSelector(getPageState, fromUser.isLoading);
export const getSucceeded = createSelector(getPageState, fromUser.succeeded);
export const getHasError = createSelector(getPageState, fromUser.hasError);
export const getErrorMessage = createSelector(getPageState, fromUser.errorMessage);

export const getUser = createSelector(getPageState, fromUser.user);

