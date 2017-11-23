import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Component({
  selector: 'app-root',
  template:`<ul *ngFor="let post of posts | async">
  <li>
    <strong>{{ post.name}}</strong>
    <br>
    {{post.category}}
  </li>
</ul>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

 max     = 1;
  current = 0;
  todoCollectionRef: AngularFirestoreCollection<any>;
  todo$: Observable<any>;
  posts: Observable<any[]>;
  postsCol: AngularFirestoreCollection<any>;
  constructor(public afs: AngularFirestore){

 }
  ngOnInit(): void {
    // this.todoCollectionRef = this.afs.collection('businesses/v2oAHP0Cc2vkU56gYxFs/branches/WlpJBNLMZ2O4akmqURpZ/stocks/AlrnJQG07iKJjAHbRtiN/items');
    //     this.todo$ = this.todoCollectionRef.valueChanges();
    //     console.log(this.todo$);
    this.postsCol = this.afs.collection('businesses/v2oAHP0Cc2vkU56gYxFs/branches/WlpJBNLMZ2O4akmqURpZ/stocks/AlrnJQG07iKJjAHbRtiN/items');
    this.posts = this.postsCol.valueChanges();
  }
  start() {
    const interval = Observable.interval(100);
    
   interval
      .takeWhile(_ => !this.isFinished )
      .do(i => this.current += 0.1)
      .subscribe();
  }

  /// finish timer
  finish() {
    this.current = this.max;
  }

 /// reset timer
  reset() {
    this.current = 0;
  }
  /// Getters to prevent NaN errors

 get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

 get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

 get isFinished() {
    return this.currentVal >= this.maxVal;
  }




}