import { Component, OnInit } from '@angular/core';
import { ISettings, SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings: ISettings;
  check1DAll = false;
  check2DAll = false;
  constructor(public settingsService: SettingsService) {
    this.settingsService.getSettings().then((value: ISettings) => {
      this.settings = value;
    });
  }
  updateSettings() {
    this.settingsService.updateSettings(this.settings);
  }
  changeAllBarcodes(event, type) {
    const isChecked = event.target.checked;
    this.settings.barcode[type].map(item => {
      item.value = isChecked;
      return item;
    });
  }
  checkBarcode() {
    setTimeout(() => {
      this.settingsService.updateSettings(this.settings);
    }, 100);
  }
  ngOnInit() {
  }

}
