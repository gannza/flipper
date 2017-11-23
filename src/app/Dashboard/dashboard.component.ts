import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {


  todoCollectionRef: AngularFirestoreCollection<any>;
  todo$: Observable<any>;
  posts: Observable<any[]>;
  postsCol: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore){

 }

  ngOnInit() {
    // this.todoCollectionRef = this.afs.collection('businesses/v2oAHP0Cc2vkU56gYxFs/branches/WlpJBNLMZ2O4akmqURpZ/stocks/AlrnJQG07iKJjAHbRtiN/items');
    //     this.todo$ = this.todoCollectionRef.valueChanges();
    //     console.log(this.todo$);
    this.postsCol = this.afs.collection('businesses/v2oAHP0Cc2vkU56gYxFs/branches/WlpJBNLMZ2O4akmqURpZ/stocks/AlrnJQG07iKJjAHbRtiN/items');
    this.posts = this.postsCol.valueChanges();
  }

}
