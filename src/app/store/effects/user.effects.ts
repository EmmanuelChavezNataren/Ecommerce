import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from '../../models/User';
import { UserApi } from 'src/app/models/UserApi';

@Injectable()
export class UserEffects {

    loadUSer$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loadUSer),
        switchMap((action) => this.apiService.getDataProfile().pipe(
            map((userApi: UserApi) => {
                const user = new User(userApi);
                return userActions.loadUSerSuccess({ user });
            }),
            catchError((error: Error) => of(userActions.loadUSerError({ payload: error })))
        ))
    ));

    constructor(
        private actions$: Actions,
        public apiService: ApiService,
    ) { }

}
