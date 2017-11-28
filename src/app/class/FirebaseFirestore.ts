import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
export class FirebaseFirestore {

    itemsCol: AngularFirestoreCollection<any>;

    constructor(public afs: AngularFirestore){
  
   }
    fsCollection(colname){

         this.itemsCol = this.afs.collection(colname);
         return this.itemsCol.valueChanges();
         
    }
}