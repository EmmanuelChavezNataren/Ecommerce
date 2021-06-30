import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User';

export const loadUSer = createAction(
    '[User] Load USer');

export const loadUSerSuccess = createAction(
    '[User] Load USer Success',
    props<{ user: User }>()
);

export const loadUSerError = createAction(
    '[User] Load USer Error',
    props<{ payload: Error }>()
);
