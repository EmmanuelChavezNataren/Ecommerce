import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import * as fromUserActions from '../actions/user.actions';
import * as fromUserReducer from '../reducers/user.reducer';
import * as fromUserSelector from '../selectors/user.selector';

@Injectable()
export class UserFacade {

    constructor(private store: Store<fromUserReducer.State>) { }

    get isLoading$(): Observable<boolean> {
        return this.store.select(fromUserSelector.getIsLoading);
    }
    get succeeded$(): Observable<boolean> {
        return this.store.select(fromUserSelector.getSucceeded);
    }
    get hasError$(): Observable<boolean> {
        return this.store.select(fromUserSelector.getHasError).pipe(filter((x) => x));
    }
    get error$(): Observable<any> {
        return this.store
            .select(fromUserSelector.getErrorMessage);
    }
    get user$(): Observable<User> {
        return this.store.select(fromUserSelector.getUser).pipe(filter((x) => !!x));
    }

    loadUser() {
        this.store.dispatch(fromUserActions.loadUSer());
    }

}
