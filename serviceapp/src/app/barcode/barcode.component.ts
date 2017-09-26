import {Component} from '@angular/core';

import {BarcodeValidatorService} from './shared/barcode-validator.service';
import {BarcodeDecoderService} from './shared/barcode-decoder.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
  providers: [BarcodeValidatorService, BarcodeDecoderService],
})
export class BarcodeComponent {
  barCodeScan() {
    let href = window.location.href;
    const ptr = href.lastIndexOf('/producto-scan');
    if (ptr > 0) {
      href = href.substr(0, ptr);
    }
    if (navigator.userAgent.match(/Firefox/i)) {
      // Used for Firefox. If Chrome uses this, it raises the "hashchanged" event only.
      window.location.href = ('zxing://scan/?ret=' + encodeURIComponent(href + '/producto/detail/{CODE}'));
    } else {
      // Used for Chrome. If Firefox uses this, it leaves the scan window open.
      window.open('zxing://scan/?ret=' + encodeURIComponent(href + '/producto/detail/{CODE}'));
    }
  }
}
