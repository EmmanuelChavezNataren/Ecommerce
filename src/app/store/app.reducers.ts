import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    products: reducers.State;
    user: reducers.State;
    cart: reducers.State;
}

export const appReducers: ActionReducerMap<AppState> = {
    products: reducers.reducer,
    user: reducers.reducer,
    cart: reducers.reducer
};
