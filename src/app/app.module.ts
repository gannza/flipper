import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as $ from 'jquery';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- here
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent } from 'app/DashBoard/dashboard.component';
import { appRouting } from 'app/app-routing.module';
import { firebaseFirestoreConfig } from 'app/firebaseconfig/firebase';
import { ItemsComponent } from 'app/items/items.component';
import { NavTopComponent } from 'app/nav_Top/nav.component';
import { LeftSideBarComponent } from 'app/left-sidebar/left-sidebar.component';
import { AddItemsComponent } from 'app/addItem/additem.component';
import { ItemsService } from 'app/services/item.service';
import { ItemsInStockService } from 'app/services/ItemsInStock.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemsComponent,
    NavTopComponent,
    LeftSideBarComponent,
    AddItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // <-- here
    appRouting,
    AngularFireModule.initializeApp(firebaseFirestoreConfig.firebase),
    AngularFirestoreModule.enablePersistence()

 ],
 providers: [ItemsService,ItemsInStockService],
  bootstrap: [AppComponent]
})
export class AppModule { }