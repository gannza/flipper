import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loader',
  templateUrl:'./splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css']
})
export class SplashComponent {
  
constructor(private router: Router){
    this.loadSplash();
}
    loadSplash(){

        setInterval(this.router.navigate(['box']), 2000);
   
    }
}