import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ItemId, Items } from 'app/interface/Items';
import { newItems } from 'app/class/Items';

@Injectable()
export class keyGeneratorService {
    generatecode(){
        var today = new Date();
        return today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+''+today.getHours()+''+today.getMinutes()+''+today.getSeconds();
      }
     getDateTime(){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return  date+' '+time;
    }
  
}