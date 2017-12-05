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
export class SplashComponent implements OnInit{
  public loadingText="Loading";
  private timeSplash=0;
  private count =0;
constructor(private router: Router){
   
}
ngOnInit() { this.loadSplash() }
    loadSplash(){
   setInterval(()=>{
       if(this.timeSplash<8000){
           this.timeSplash+=400;
           if(this.count===3){
            this.count=0;
            this.loadingText="Loading";

           }else{
               this.loadingText+=".";
               this.count++;
           }

       }else{
           this.router.navigate(['box',{clearHistory:true}]);
       }
   },400);
    }
}