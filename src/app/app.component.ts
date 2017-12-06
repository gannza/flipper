import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import { AuthService } from './core/auth.service';
import { ElectronService } from './providers/electron.service';
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // constructor(public electronService: ElectronService) {
  //       //TODO: in case you need to run thhe app on web.
  //       if (electronService.isElectron()) {
  //         console.log('Mode electron');
  //         // Check if electron is correctly injected (see externals in webpack.config.js)
  //         console.log('c', electronService.ipcRenderer);
  //         // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
  //         console.log('c', electronService.childProcess);
  //       } else {
  //         console.log('Mode web');
  //       }
  //     }
}