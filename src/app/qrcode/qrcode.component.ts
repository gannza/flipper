import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
 
@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.component.html'
})
export class QRCode {
  qrData = null;
  createdCode = null;
  scannedCode = null;
 
  constructor(private barcodeScanner: BarcodeScanner) { }
 
  createCode() {
    this.createdCode = this.qrData;
  }
 
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    });
  }
 
}