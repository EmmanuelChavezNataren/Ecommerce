import { Component, QueryList, ViewChildren } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.getDataObject('isLogin')
        .then((isLogin) => {
          if(!!isLogin){
            this.router.navigateByUrl('/login');
              SplashScreen.hide({
                fadeOutDuration: 500
              });
          }
          else{
            this.router.navigateByUrl('/wizard');
            SplashScreen.hide({
              fadeOutDuration: 500
            });
          }
        });
    });
  }
}
