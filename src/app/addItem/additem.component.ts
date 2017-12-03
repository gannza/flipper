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
import { I18n, CustomDatepickerI18n } from 'app/class/DatePicker';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgxQRCodeModule } from 'ngx-qrcode2';
                
                @Component({
                selector: 'AddItems',
                templateUrl: './additem.component.html',
                styleUrls: ['./additem.component.css'],
                })
                export class AddItemsComponent implements OnInit {
                isNull: boolean=false;
             
                iscategoryNull: boolean;
                isstock_quantityNull: boolean;
                ispriceNull: boolean;
                isnameNull: boolean;
                itemObj: newItems;
                @Input() item: newItems;
                constructor(private itemsService: ItemsService, private instockService: ItemsInStockService,private router: Router) {
                 
                }
                 ngOnInit() {
                    this.item = new newItems();
                    this.isNull=false;
                   
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

                    if (this.item) {
                    this.item.sold_quantity = this.item.stock_quantity;
                    this.item.icon = 612;
                    this.item.id = 1;
                    this.item.recorded_date = new Date();

                    if (this.item.expiry_date!==null && this.item.expiry_date) {

                        this.item.expiry_date = new Date(this.item.expiry_date);
                    }else{

                        this.item.expiry_date= new Date('00/00/000');
                    }

                    this.itemsService.create(this.item)
                        .then((docRef) => {

                        if (this.instockService.create({
                            item_id: docRef.id,
                            in_quantity: this.item.stock_quantity,
                            in_date: new Date(),
                            available: true
                            })) {

                            alert('successfully recorded!');
                            
                             this.isNull = false;
                             return this.item = new newItems;
                        }


                        })
                        .catch(function (error) {
                        console.error("Error adding document: ", error);
                        });
                    } 
                }
                }
