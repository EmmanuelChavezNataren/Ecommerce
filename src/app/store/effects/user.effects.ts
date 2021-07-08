import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

import { User } from '../../models/User';
import { Error } from 'src/app/models/Error';
import * as fromUser from '../actions/user.actions';

@Injectable()
export class UserEffects {


    loadUSer$ = createEffect(() => this.actions$.pipe(
        ofType(fromUser.loadUSer),
        switchMap(() => this.apiService.getDataProfile().pipe(
            map((user: User) => fromUser.loadUSerSuccess({ user })),
            catchError((error: Error) => of(fromUser.loadUSerError({ payload: error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService,
    ) { }

}
