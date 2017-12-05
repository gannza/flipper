import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Invoices } from 'app/interface/invoice';

@Injectable()
export class InvoiceService {
  
  InvoicesCollection: AngularFirestoreCollection<Invoices>;
  InvoicesDocument:   AngularFirestoreDocument<Invoices>;

  constructor(private afs: AngularFirestore) {
    this.InvoicesCollection =  this.afs.collection<Invoices>('invoices', (ref) => ref.where('user_id', "==",'1').where("is_transction_done", "==", false).limit(1));
  }

  get_transction_done(){
 
    return this.InvoicesCollection.snapshotChanges().map(actions => {
                return actions.map(a => {
                  const data = a.payload.doc.data() as Invoices;
                  const Invoicesid = a.payload.doc.id;
                  return { Invoicesid, ...data };
                });
              });
  }

  getData(): Observable<Invoices[]> {
    return this.InvoicesCollection.valueChanges();
  }
//   snapshotChanges(){
//     return this.InvoicesCollection.snapshotChanges().map(actions => {
//         return actions.map(a => {
//           const data = a.payload.doc.data() as Invoices;
//           const Invoicesid = a.payload.doc.id;
//           return { Invoicesid, ...data };
//         });
//       });
// }

  getInvoices(id: string) {
    return this.afs.doc<Invoices>(`invoices/${id}`);
  }


  create(Invoices) {
    
   const InvoicesObj = Object.assign({}, Invoices);
   return this.InvoicesCollection.add(InvoicesObj);
   
 }

  updateInvoices(id: string, data) {
    return this.getInvoices(id).update(data);
  }

  deleteInvoices(id: string) {
    return this.getInvoices(id).delete();
  }
}


