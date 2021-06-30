import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { GlobalService } from 'src/app/services/global/global.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: User;
  isLoading: boolean;
  error: Error;
  constructor(
    public storage: StorageService,
    private store: Store<AppState>,
    public globalService: GlobalService
    ) {
  }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(userLogin => userLogin.user != null)
      )
      .subscribe(({ user, loading, error }) => {
        this.isLoading = loading;
        this.error = error;
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
