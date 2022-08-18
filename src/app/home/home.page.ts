import { Component } from '@angular/core';
import { ActionSheetController, Platform } from '@ionic/angular';
import { ISettings, SettingsService } from '../services/settings.service';
declare var ScanzyBarcodeScanner: any;
declare var ScanzyBarcodeOptions: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  actionSheet: any;
  settings: ISettings;
  constructor(public actionSheetController: ActionSheetController, public platform: Platform, public settingsService: SettingsService) {
    this.settingsService.getSettings().then((value: ISettings)=>{
      this.settings = value
    })
  }

  scan(type) {
    try {
        if(type=='1D') {
          let settings = new ScanzyBarcodeOptions(
            this.settings.enableBeep, 
            this.settings.enableVibrate, 
            this.settings.enableAutoZoom, 
            this.settings.enableScanRectOnly, 
            this.settings.barcode['1D'].filter(item=>{return item.value}).map(item=>{return item.type})
          )
          console.log(settings);
          ScanzyBarcodeScanner.scan(this.scanSuccess.bind(this), this.scanFailure.bind(this), settings)
        }
        else{
          let settings = new ScanzyBarcodeOptions(
            this.settings.enableBeep, 
            this.settings.enableVibrate, 
            this.settings.enableAutoZoom, 
            this.settings.enableScanRectOnly, 
            this.settings.barcode['2D'].filter(item=>{return item.value}).map(item=>{return item.type})
          )
          console.log(settings);
          ScanzyBarcodeScanner.qrscan(this.scanSuccess.bind(this), this.scanFailure.bind(this), settings)
        }
    } catch (e) {
      alert(e);
    }
  }

  scanSuccess(code) {
    console.log('scan result:', code)
    if(code!='')
      this.doResearch(code)
  }

  async doResearch(code) {
      this.actionSheet = await this.actionSheetController.create({
      header: code,
      subHeader: 'Where would you like to do your research?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Amazon Listing',
        handler: () => {
          window.open("http://www.amazon.com/gp/product/" + code, "_blank")
          this.doResearch(code)
        }
      }, {
        text: 'Amazon Prime',
        handler: () => {
          window.open("http://www.amazon.com/gp/offer-listing/" + code +"/sr=/qid=/ref=olp_prime_all?ie=UTF8&colid=&coliid=&condition=all&me=&qid=&seller=&shipPromoFilter=1&sort=sip&sr=", "_blank")
          this.doResearch(code)
        }
      }, {
        text: 'Keepa',
        handler: () => {
          window.open(" https://keepa.com/#!product/1-" + code, "_blank");
          this.doResearch(code)
        }
      },{
        text: 'CamelCamelCamel',
        handler: () => {
          window.open("http://camelcamelcamel.com/product/" + code, "_blank");
          this.doResearch(code)
        }
      }, {
        text: 'BookScouter',
        handler: () => {
          window.open("https://bookscouter.com/sell/" + code, "_blank");
          this.doResearch(code)
        }
      },{
        text: 'Ebay',
        handler: () => {
          window.open("http://www.ebay.com/sch/i.html?_trksid=p2050601.m570.l1313&_nkw=" + code + "&_sacat=0&_from=R40", "_blank");
          this.doResearch(code)
        }
      },
      {
          text: 'Google',
          handler: () => {
            window.open("https://www.google.com/search?q=" + code, "_blank");
            this.doResearch(code)
          }
      },{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await this.actionSheet.present();

    await this.actionSheet.onDidDismiss().then(()=>{
      this.actionSheet = null;
    })
  }

  registerBackButton() {
    this.platform.ready().then(() => {
        let isAndroid = this.platform.is('android');
        if (isAndroid) {
          this.platform.backButton.subscribe(() => {
            // code that is executed when the user pressed the back button
            if(this.actionSheet) {
              this.actionSheet.dismiss()
            }
          })
        }
    });
  }

  scanFailure(err) {
    console.log('scan error:', err)
  }

  ngOnInit() {
    this.registerBackButton()
  }

}