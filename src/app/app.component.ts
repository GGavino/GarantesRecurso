import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular'
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { ScreenOrientation } from '@capacitor/screen-orientation'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private appStorage: Storage, private platform: Platform) {
    this.init();
  }

  async init() {
    this.platform.ready().then(async () => {
      //Bloquear a orientação para portrait
      await ScreenOrientation.lock({ orientation: 'portrait' });
    })
    await this.appStorage.defineDriver(cordovaSQLiteDriver);
    await this.appStorage.create();
  }
}
