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
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AddCartId, AddCart } from 'app/interface/add_cart';
import { AddCartService } from 'app/services/addCart.service';
import { keyGeneratorService } from 'app/services/keyGenerater.service';
                
                @Component({
                selector: 'AddCartItems',
                templateUrl: './addcart.component.html',
                styleUrls: ['./addcart.component.css'],
                })
                export class AddCartComponent implements OnInit {
                   
                    vat: number=18;
                
                    showSpinner: boolean;
                    isNull: boolean=false;
                
                       carts:Observable<AddCartId[]>;
                       @Input() 
                       cartItem: AddCart;
                       constructor(private keycode:keyGeneratorService,private itemsService: ItemsService, private cartService: AddCartService,private route: ActivatedRoute,private router: Router,private location: Location) {
                       
                        
                       }
                        ngOnInit() {
                            this.carts = this.cartService.snapshotChanges();
                           }
                      

                       onClose(){
                           this.isNull=false;
                       }
                       onGoBack(){
                           return this.router.navigate(['items']);
                          
                       }
       
       
                      
       
                     
                       }
       