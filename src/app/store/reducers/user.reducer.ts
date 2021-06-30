import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User';
import * as ActionsUser from '../actions';

export interface UserState {
    user: User;
    loaded: boolean;
    loading: boolean;
    error: Error;
};

export const usersInitialState: UserState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
};

const userReducer = createReducer(usersInitialState,

    on(ActionsUser.loadUSer, state => ({ ...state, loading: true })),

    on(ActionsUser.loadUSerSuccess, (state, { user }) => ({
        ...state,
        loading: false,
        loaded: true,
        user
    })),

    on(ActionsUser.loadUSerError, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: false,
        error: payload
    })),

);

export const userreducer = (state: UserState | undefined, action: Action) =>
userReducer(state, action);
