import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- here
import { RoundProgressModule } from 'angular-svg-round-progressbar'; // <-- here




import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- here
    RoundProgressModule, // <-- and here
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()

 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }