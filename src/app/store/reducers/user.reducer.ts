import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { Error } from 'src/app/models/Error';
import * as fromUser from '../actions/user.actions';
export const featureKey = 'user';

export interface State {
    user: User;
    loaded: boolean;
    hasError: boolean;
    loading: boolean;
    error: Error;
};

export const initialState: State = {
    user: null,
    loaded: false,
    hasError: false,
    loading: false,
    error: null
};

const userReducer = createReducer(initialState,

    on(fromUser.loadUSer, state => ({ ...state, loading: true })),

    // eslint-disable-next-line @typescript-eslint/no-shadow
    on(fromUser.loadUSerSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        hasError: false,
        user
    })),

    on(fromUser.loadUSerError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        hasError: true,
        error: payload
    })),

);

export const reducer = (state: State | undefined, action: Action) =>
    userReducer(state, action);

export const isLoading = (state: State) => state.loading;
export const succeeded = (state: State) => state.loaded;
export const hasError = (state: State) => state.hasError;
export const errorMessage = (state: State) => state.error;
export const user = (state: State) => state.user;
