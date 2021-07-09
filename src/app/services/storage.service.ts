import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public toastCtrl: ToastController) { }

  async setData(key: string, value: any): Promise<void> {
    await Storage.set({
      key,
      value,
    });
  }

  async getDataObject<T>(key: string): Promise<T> {
    const res = await Storage.get({ key });
    return JSON.parse(res.value);
  }

  async getData(key: string): Promise<string> {
    const { value } = await Storage.get({ key });
    return value;
  }

  async remove(key: string): Promise<void> {
    await Storage.remove({ key });
  }
}
