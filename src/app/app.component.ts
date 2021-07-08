import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { CartFacade } from './store/facades/cart.facade';
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
    private cartFacade: CartFacade,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.cartFacade.loadCart();
    this.platform.ready().then(() => {
      this.storage.getDataObject('firstLoad')
        .then((res) => {
          console.log(res);
          if (res) {
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
