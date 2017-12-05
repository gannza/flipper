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
import {
    ActivatedRoute, Router,
} from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
            
                
                @Component({
                selector: 'EditItems',
                templateUrl: './edititem.component.html',
                styleUrls: ['./edititem.component.css'],
                })
                export class EditItemsComponent implements OnInit {
                isNull: boolean=false;
             
                iscategoryNull: boolean;
                isstock_quantityNull: boolean;
                ispriceNull: boolean;
                isnameNull: boolean;
                itemId: string;
                sub: Subscription;
                itemObj: newItems;
                @Input() item: newItems;
                constructor(private itemsService: ItemsService, private instockService: ItemsInStockService,private route: ActivatedRoute,private router: Router,private location: Location) {
                    this.item = new newItems();
                    this.isNull=false;
                    this.sub = this.route.params.subscribe(params => {
                        this.itemId = params['id'];
                    });
                 
                }
                 ngOnInit() {this.getItem() }

                onClose(){
                    this.isNull=false;
                }
                onGoBack(){
                    return this.router.navigate(['items']);
                   
                }


                getItem(){

                    this.itemsService.findItem(this.itemId).subscribe(params => this.item = params);
                }
                onEditItem() {
                    
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

                   

                   
                    this.item.icon = 612;
                    this.item.id = 1;
                    this.item.recorded_date = new Date();

                    if (this.item.expiry_date!==null && this.item.expiry_date) {

                        this.item.expiry_date = new Date(this.item.expiry_date);
                    }else{

                        this.item.expiry_date= new Date('00/00/000');
                    }
                    if(this.item && this.item!==null){
                        
                   if( this.itemsService.updateItem(this.itemId,this.item) ){
                      
                         this.isNull = false;
                         this.item = new newItems;
                         return this.location.back();
                    
                        }
                    
                    }

          }

                ngOnDestroy() {
                   this.sub.unsubscribe();
                }
                }
