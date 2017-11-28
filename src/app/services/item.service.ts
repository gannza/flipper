import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ItemId, Items } from 'app/interface/Items';

@Injectable()
export class ItemsService {
  
  itemsCollection: AngularFirestoreCollection<Items>;
  itemDocument:   AngularFirestoreDocument<Node>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Items>('items', (ref) => ref.orderBy('recorded_date', 'desc').limit(100));
  }

  getData(): Observable<Items[]> {
    return this.itemsCollection.valueChanges();
  }
  snapshotChanges(){
    return this.itemsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Items;
          const itemid = a.payload.doc.id;
          return { itemid, ...data };
        });
      });
}

  getItem(id: string) {
    return this.afs.collection<Items>("items").doc(id);
  }

  create(items) {
     
    const itemObj = Object.assign({}, items);
    return this.itemsCollection.add(itemObj);

  }

  updateItem(id: string, data: Partial<Items>) {
    return this.getItem(id).update(data);
  }

  deleteItem(id: string) {
    return this.getItem(id).delete();
  }

}


