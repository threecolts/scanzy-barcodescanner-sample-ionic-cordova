import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
declare var ScanzyBarcodeFormat: any;
export interface ISettings {
  enableVibration: boolean;
  enableBeep: boolean;
  enableAutoZoom: boolean;
  enableScanCropRectOnly: boolean;
  barcode: IBarcode;
}

export interface IBarcode {
  '1D': IBarcodeType[];
  '2D': IBarcodeType[];
}

export interface IBarcodeType {
  type: string;
  value: boolean;
}
@Injectable()
export class SettingsService {
  public settings: ISettings = null;
  constructor(private storage: Storage) {
    this.storage.create();
  }

  public getSettings() {
    return new Promise ((resolve, reject)=>{
      if(this.settings != null) {
        return resolve(this.settings);
      } else {
        this.storage.get('SCANZY_SETTINGS').then(value=>{
          if(value==null) {
            value = ({
              enableVibration: true,
              enableBeep: true,
              enableAutoZoom: false,
              enableScanCropRectOnly: false,
              barcode: {
                '1D': [{type: ScanzyBarcodeFormat.Code128, value: true},{type: ScanzyBarcodeFormat.Code39, value: true}, {type: ScanzyBarcodeFormat.Code93, value: true}, {type: ScanzyBarcodeFormat.CodaBar, value: true}, {type: ScanzyBarcodeFormat.EAN13, value: true}, {type: ScanzyBarcodeFormat.EAN8, value: true},{type: ScanzyBarcodeFormat.ITF, value: true},{type: ScanzyBarcodeFormat.UPCA, value: true},{type: ScanzyBarcodeFormat.UPCE, value: true}],
                '2D': [{type: ScanzyBarcodeFormat.QRCode, value: true},{type: ScanzyBarcodeFormat.DataMatrix, value: true},{type: ScanzyBarcodeFormat.PDF417, value: true},{type: ScanzyBarcodeFormat.Aztec, value: true}, {type: ScanzyBarcodeFormat.MaxiCode, value: true}]
              }
            }) as ISettings;
            this.storage.set('SCANZY_SETTINGS', value);
          }
          this.settings = value;
          return resolve(this.settings);
        });
      }
    });
  }

  public updateSettings(settings: ISettings) {
    this.storage.set('SCANZY_SETTINGS', settings);
  }
}
