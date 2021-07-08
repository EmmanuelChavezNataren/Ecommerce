import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';
import { Error } from 'src/app/models/Error';

export const enum UserActionTypes {
    loaduser = '[User] Load USer',
    loadusersuccess = '[User] Load USer Success',
    loadusererror = '[User] Load USer Error'
}

export const loadUSer = createAction(UserActionTypes.loaduser);

export const loadUSerSuccess = createAction(
  UserActionTypes.loadusersuccess,
  props<{ user: User }>()
);

export const loadUSerError = createAction(
  UserActionTypes.loadusererror,
  props<{ payload: Error }>()
);
