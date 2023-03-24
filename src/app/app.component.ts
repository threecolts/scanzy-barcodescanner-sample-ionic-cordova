import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var ScanzyBarcodeManager: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(()=>{
      ScanzyBarcodeManager.setLicense('BdyCh9eyxw\$9#k2qX79Z');
    });
  }
}
