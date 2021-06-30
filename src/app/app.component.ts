import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { AppState } from './store/app.reducers';
import { Store } from '@ngrx/store';
import { loadUSer } from './store/actions';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  previousRoute = '';
  constructor(
    private platform: Platform,
    public storage: StorageService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.store.dispatch(loadUSer());

    this.platform.ready().then(() => {
      this.storage.validFirstLoad()
        .then((res) => {
          if (res === 1) {
            this.router.navigateByUrl('/login');
              SplashScreen.hide({
                fadeOutDuration: 500
              });
          }
          else {
            this.router.navigateByUrl('/wizard');
            SplashScreen.hide({
              fadeOutDuration: 500
            });
          }
        });
    });
  }
}
