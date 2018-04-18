import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  app: string;

  constructor(public platform:ElectronService) {

   }

  ngOnInit() {
    this.windowCustome();
  }

  windowCustome(){
    if(this.platform.isElectron()){
      this.app="desktop_app";
    }else{
      this.app="container web_app"; 
    }
  }

}
