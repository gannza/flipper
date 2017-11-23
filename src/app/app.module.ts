import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- here
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from 'app/DashBoard/dashboard.component';
import { appRouting } from 'app/app-routing.module';
import { firebaseFirestoreConfig } from 'app/firebaseconfig/firebase';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- here
    appRouting,
    AngularFireModule.initializeApp(firebaseFirestoreConfig.firebase),
    AngularFirestoreModule.enablePersistence()

 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }