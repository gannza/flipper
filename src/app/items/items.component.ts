import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'Items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {

    
 items: Observable<any[]>;
  itemsCol: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore){

 }

  ngOnInit() {
    this.itemsCol = this.afs.collection('items');
    this.items = this.itemsCol.valueChanges();
  }

}