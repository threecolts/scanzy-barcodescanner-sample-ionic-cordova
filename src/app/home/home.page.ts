import { Component, OnInit } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { ISettings, SettingsService } from '../services/settings.service';
declare var ScanzyBarcodeManager: any;
declare var ScanzyBarcodeOptions: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  actionSheet: any;
  settings: ISettings;
  constructor(public actionSheetController: ActionSheetController, public platform: Platform, public settingsService: SettingsService) {
    this.settingsService.getSettings().then((value: ISettings) => {
      this.settings = value;
    });
  }

  scan(type) {
    try {
      const settings = new ScanzyBarcodeOptions(
        this.settings.enableVibration,
        this.settings.enableBeep,
        this.settings.enableAutoZoom,
        this.settings.enableScanCropRectOnly,
        this.settings.barcode[type].filter(item => item.value).map(item => item.type)
      );
      ScanzyBarcodeManager.scan(this.scanSuccess.bind(this), this.scanFailure.bind(this), settings);
    } catch (e) {
      alert(e);
    }
  }

  scanSuccess(result) {
    console.log('scan result:', result.barcode, result.barcodeType);
    if (result.barcode !== '') { this.doResearch(result.barcode, result.barcodeType); }
  }

  async doResearch(barcode, barcodeType) {
    this.actionSheet = await this.actionSheetController.create({
      header: `${barcode} (${barcodeType})`,
      subHeader: 'Where would you like to do your research?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Amazon Listing',
        handler: () => {
          window.open('http://www.amazon.com/gp/product/' + barcode, '_blank');
          this.doResearch(barcode, barcodeType);
        }
      }, {
        text: 'Amazon Prime',
        handler: () => {
          window.open('http://www.amazon.com/gp/offer-listing/' + barcode + '/sr=/qid=/ref=olp_prime_all?ie=UTF8&colid=&coliid=&condition=all&me=&qid=&seller=&shipPromoFilter=1&sort=sip&sr=', '_blank');
          this.doResearch(barcode, barcodeType);
        }
      }, {
        text: 'Keepa',
        handler: () => {
          window.open(' https://keepa.com/#!product/1-' + barcode, '_blank');
          this.doResearch(barcode, barcodeType);
        }
        }, {
        text: 'CamelCamelCamel',
        handler: () => {
          window.open('http://camelcamelcamel.com/product/' + barcode, '_blank');
          this.doResearch(barcode, barcodeType);
        }
      }, {
        text: 'BookScouter',
        handler: () => {
          window.open('https://bookscouter.com/sell/' + barcode, '_blank');
          this.doResearch(barcode, barcodeType);
        }
        }, {
        text: 'Ebay',
        handler: () => {
          window.open('http://www.ebay.com/sch/i.html?_trksid=p2050601.m570.l1313&_nkw=' + barcode + '&_sacat=0&_from=R40', '_blank');
          this.doResearch(barcode, barcodeType);
        }
      },
      {
        text: 'Google',
        handler: () => {
          window.open('https://www.google.com/search?q=' + barcode, '_blank');
          this.doResearch(barcode, barcodeType);
        }
        }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await this.actionSheet.present();

    await this.actionSheet.onDidDismiss().then(() => {
      this.actionSheet = null;
    });
  }

  registerBackButton() {
    this.platform.ready().then(() => {
      const isAndroid = this.platform.is('android');
      if (isAndroid) {
        this.platform.backButton.subscribe(() => {
          // code that is executed when the user pressed the back button
          if (this.actionSheet) {
            this.actionSheet.dismiss();
          }
        });
      }
    });
  }

  scanFailure(err) {
    console.log('scan error:', err);
  }

  ngOnInit() {
    this.registerBackButton();
  }

}
