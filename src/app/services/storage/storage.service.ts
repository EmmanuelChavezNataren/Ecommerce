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
    async validFirstLoad() {
        const ret = await Storage.get({ key: 'firstLoadApp' });
        const fl = JSON.parse(ret.value);
        if (fl) {
            return 1;
        }
        return 0;
    }

    async setFirstLoad() {
        await Storage.set({
            key: 'firstLoadApp',
            value: '1'
        });
        return 1;
    }
}
