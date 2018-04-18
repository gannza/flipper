import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './leftsider.component.html',
  styleUrls: ['./leftsider.component.scss']
})
export class SideBar implements OnInit {
  side:any;
  constructor(public platform:ElectronService) {

   }
   

  ngOnInit() {
    this.windowCustome();
  }
  windowCustome(){
    if(this.platform.isElectron()){
      this.side="desktop_side";
    }else{
      this.side="web_side"; 
    }
  }

}