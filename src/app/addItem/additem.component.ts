                import {
                Component,
                OnInit,
                Input,
                Pipe,
                Injectable
                } from '@angular/core';
                import {
                AngularFirestore,
                AngularFirestoreCollection
                } from 'angularfire2/firestore';
                import {
                Observable
                } from 'rxjs/Observable';
                import {
                newItems
                } from 'app/class/Items';
                import {
                Items,
                ItemId
                } from 'app/interface/Items';
                import {
                ItemsService
                } from 'app/services/item.service';
                import {
                ItemsInStockService
                } from 'app/services/ItemsInStock.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';    
import {FormControl} from '@angular/forms';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import * as _moment from 'moment';
import * as _rollupMoment from 'moment';
import { keyGeneratorService } from 'app/services/keyGenerater.service';
const moment = _rollupMoment || _moment;

                @Component({
                selector: 'AddItems',
                templateUrl: './additem.component.html',
                styleUrls: ['./additem.component.css'],
                providers: [
                   
                  ],
                })
                export class AddItemsComponent implements OnInit {
                    date = new FormControl(moment([2017, 0, 1]));
                    random1: number;
                        isunitNull: boolean;
                        iscurrencyNull: boolean;
                        qrData: string;
                        isNull: boolean=false;
             
                        iscategoryNull: boolean;
                        isstock_quantityNull: boolean;
                        ispriceNull: boolean;
                        isnameNull: boolean;
                        itemObj: newItems;
                        createdCode = null;
                        scannedCode = null;
                         @Input() item: newItems;
                
                constructor(private keycode:keyGeneratorService,private barcodeScanner: BarcodeScanner,private itemsService: ItemsService, private instockService: ItemsInStockService,private router: Router) {
                 
                }
                 ngOnInit() {
                  
                    this.item = new newItems();
                  
                    this.isNull=false;
                   this.createCode();
                }

            
                createCode() {
                    this.createdCode ='PRO-'+this.keycode.generatecode();
                  }
                 
                scanCode() {
                    this.barcodeScanner.scan().then(barcodeData => {
                    this.scannedCode = barcodeData.text;
                    }, (err) => {
                        console.log('Error: ', err);
                    });
                }

                onClose(){
                    this.isNull=false;
                }
                onGoBack(){
                    return this.router.navigate(['items']);
                }

                onSaveItem() {
                    
                    if (this.item.name == "" || this.item.name == null) {
                    this.isnameNull = true;
                    this.isNull = true;
                    }
                    if (this.item.price == 0 || this.item.price == null) {
                    this.ispriceNull = true;
                    this.isNull = true;
                    }
                    if (this.item.stock_quantity == 0 || this.item.stock_quantity == null) {
                    this.isstock_quantityNull = true;
                    this.isNull = true;
                    }
                    if (this.item.category == "Choose Category" || this.item.category == "" || this.item.stock_quantity == null) {
                    this.iscategoryNull = true;
                    this.isNull = true;
                    }
                    if (this.item.currency == " Choose Currency" || this.item.currency == "" || this.item.currency == null) {
                        this.iscurrencyNull = true;
                        this.isNull = true;
                        }
                        if (this.item.unit == " Choose unit" || this.item.unit == "" || this.item.unit == null) {
                            this.isunitNull = true;
                            this.isNull = true;
                            }

                       

                    if (this.item && this.isNull==false) {

                    if(this.createdCode){
                       this.item.qrcode= this.createdCode;
                    }
                    this.item.sold_quantity = this.item.stock_quantity;
                    this.item.icon = 612;
                    this.item.id = 1;
                    this.item.recorded_date = new Date();

                    if (this.item.expiry_date!==null && this.item.expiry_date) {
                     
                    this.item.expiry_date = new Date(this.item.expiry_date);
                     
                    }else{
                        this.item.expiry_date=null;
                    }


                    this.itemsService.create(this.item)
                        .then((docRef) => {

                        if (this.instockService.create({
                            item_id: docRef.id,
                            in_quantity: this.item.stock_quantity,
                            in_date: new Date(),
                            available: true
                            })) {
                           
                            this.itemsService.updateSigleItem(docRef.id,{itemid:docRef.id});

                             this.isNull = false;
                             this.createCode();
                             return this.item = new newItems;
                        }


                        })
                        .catch(function (error) {
                        console.error("Error adding document: ", error);
                        });
                    } 
                }
                }
