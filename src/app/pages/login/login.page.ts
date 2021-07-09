import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/User';
import { StorageService } from 'src/app/services/storage.service';
import { UserFacade } from 'src/app/store/facades/user.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  userSubscription = new Subscription();
  user: User;
  isLoading$: Observable<boolean>;
  error: Error;
  constructor(
    private userFacade: UserFacade,
    private storage: StorageService
    ) {
  }

  ngOnInit() {
    this.userSubscription.add(this.userFacade.user$.subscribe(user => {
      this.user = user;
      this.storage.setData('user', JSON.stringify(user));
    }));

    this.isLoading$ = this.userFacade.isLoading$;
    this.userFacade.loadUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
