import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ItemsInStock } from 'app/interface/item_in_stock';

@Injectable()
export class ItemsInStockService {
  
  itemsCollection: AngularFirestoreCollection<ItemsInStock>;
  itemDocument:   AngularFirestoreDocument<ItemsInStock>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<ItemsInStock>('in_stock', (ref) => ref.orderBy('in_date', 'desc').limit(5));
  }

  getData(): Observable<ItemsInStock[]> {
    return this.itemsCollection.valueChanges();
  }
  snapshotChanges(){
    return this.itemsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ItemsInStock;
          const itemid = a.payload.doc.id;
          return { itemid, ...data };
        });
      });
}

  getItem(id: string) {
    return this.afs.doc<ItemsInStock>(`in_stock/${id}`);
  }
getItemByid(id){

  this.itemsCollection = this.afs.collection<ItemsInStock>('in_stock', (ref) => ref.where("item_id", "==", id).orderBy('in_date', 'desc').limit(5));
  return this.itemsCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as ItemsInStock;
      const itemid = a.payload.doc.id;
      return { itemid, ...data };
    });
  });

}

  create(items) {
    
   const itemObj = Object.assign({}, items);
   return this.itemsCollection.add(itemObj);
   
 }

  updateItem(id: string, data: Partial<ItemsInStock>) {
    return this.getItem(id).update(data);
  }

  deleteItem(id: string) {
    return this.getItem(id).delete();
  }
}


