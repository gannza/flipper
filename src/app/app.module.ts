import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { ListItemsComponent } from 'app/listItem/listitem.component';
import { EditItemsComponent } from 'app/editItem/edititem.component';
import { InscreaseItemsComponent } from 'app/increaseItem/increaseItem.component';
import { ModalComponent } from 'app/model_dialog/model.component';
import { ModalService } from 'app/services/modal.service';
import { AddCartService } from 'app/services/addCart.service';
import { AddCartComponent } from 'app/addCart/addcart.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { QRCode } from 'app/qrcode/qrcode.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { UiModules } from 'app/ui/shared/ui.module';
import { AuthGuard } from 'app/core/auth.guard';
import { SplashComponent } from 'app/splashScreen/splashscreen.component';
import { FooterComponent } from 'app/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { keyGeneratorService } from 'app/services/keyGenerater.service';
import { InvoiceService } from 'app/services/Invoice.service';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemsComponent,
    NavTopComponent,
    FooterComponent,
    LeftSideBarComponent,
    AddItemsComponent,
    ListItemsComponent,
    EditItemsComponent,
    InscreaseItemsComponent,
    ModalComponent,
    AddCartComponent,
    QRCode,
    SplashComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatCheckboxModule,
    SharedModule,
    UiModules,
    CoreModule,
    BrowserModule,
    FormsModule, // <-- here
    appRouting,
    AngularFireModule.initializeApp(firebaseFirestoreConfig.firebase),
    AngularFirestoreModule.enablePersistence(),
    NgbModule.forRoot(),
    NgxQRCodeModule

 ],
 providers: [ItemsService,ItemsInStockService,AddCartService,ModalService,BarcodeScanner,AuthGuard,keyGeneratorService,InvoiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }