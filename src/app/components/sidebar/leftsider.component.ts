import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './leftsider.component.html',
  styleUrls: ['./leftsider.component.scss']
})
export class SideBar implements OnInit {

  constructor(public platform:ElectronService) {

   }
   

  ngOnInit() {
    
  }

}