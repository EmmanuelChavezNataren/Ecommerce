import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
    products: reducers.ProductsState;
    user: reducers.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
    products: reducers.productsreducer,
    user: reducers.userreducer,
};
