import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Payments } from 'app/interface/payment';

@Injectable()
export class PaymentService {
  
  itemsCollection: AngularFirestoreCollection<Payments>;
  itemDocument:   AngularFirestoreDocument<Payments>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Payments>('payments', (ref) => ref.orderBy('payment_date', 'desc'));
  }

  getData(): Observable<Payments[]> {
    return this.itemsCollection.valueChanges();
  }
  snapshotChanges(){
    return this.itemsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Payments;
          const itemid = a.payload.doc.id;
          return { itemid, ...data };
        });
      });
}

  getItem(id: string) {
    return this.afs.doc<Payments>(`payments/${id}`);
  }


  create(items) {
    
   const itemObj = Object.assign({}, items);
   return this.itemsCollection.add(itemObj);
   
 }

  updateItem(id: string, data: Partial<Payments>) {
    return this.getItem(id).update(data);
  }

  deleteItem(id: string) {
    return this.getItem(id).delete();
  }
}


