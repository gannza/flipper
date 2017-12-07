import { Injectable } from '@angular/core';

@Injectable()
export class PrintingService {



   print(printEl: HTMLElement) {
    var print = printEl.innerHTML;
   let popupWinindow;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' + print + '</html>');
    popupWinindow.document.close();
}

}