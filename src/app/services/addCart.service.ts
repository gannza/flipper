import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AddCart } from 'app/interface/add_cart';

@Injectable()
export class AddCartService {
  
  itemsCollection: AngularFirestoreCollection<AddCart>;
  itemDocument:   AngularFirestoreDocument<AddCart>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<AddCart>('carts_items', (ref) => ref.orderBy('out_quantity', 'desc'));
  }

  getData(): Observable<AddCart[]> {
    return this.itemsCollection.valueChanges();
  }
  snapshotChanges(){
    return this.itemsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as AddCart;
          const itemid = a.payload.doc.id;
          return { itemid, ...data };
        });
      });
}

  getItem(id: string) {
    return this.afs.doc<AddCart>(`carts_items/${id}`);
  }
// getItemByid(id){

//   this.itemsCollection = this.afs.collection<AddCart>('carts_items', (ref) => ref.where("item_id", "==", id));
//   return this.itemsCollection.snapshotChanges().map(actions => {
//     return actions.map(a => {
//       const data = a.payload.doc.data() as AddCart;
//       const itemid = a.payload.doc.id;
//       return { itemid, ...data };
//     });
//   });

// }


  create(items) {
    
   const itemObj = Object.assign({}, items);
   return this.itemsCollection.add(itemObj);
   
 }

  updateItem(id: string, data: Partial<AddCart>) {
    return this.getItem(id).update(data);
  }

  deleteItem(id: string) {
    return this.getItem(id).delete();
  }
}


