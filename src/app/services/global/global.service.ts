import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  loader: any;
  constructor(
    public toastCtrl: ToastController
  ) {}

  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
        message,
        duration: 3000,
        position: 'bottom',
        color: 'secondary',
        cssClass: 'tabs-bottom'
    });
    toast.present();
  }

}
