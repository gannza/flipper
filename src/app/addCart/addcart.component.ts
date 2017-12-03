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
                
                @Component({
                selector: 'AddCartItems',
                templateUrl: './addcart.component.html',
                styleUrls: ['./addcart.component.css'],
                })
                export class AddCartComponent implements OnInit {
                    totalqty: number;
                    vat: number=18;
                    TotalTax: any;
                    totalPrice: number;
                    finalTotal:number;
                    nums: number;
                    showSpinner: boolean;
                    isNull: boolean=false;
                
                       carts:Observable<AddCartId[]>;
                       cartsn:Observable<AddCartId[]>;
                       @Input() 
                       cartItem: AddCart;
                       constructor(private itemsService: ItemsService, private cartService: AddCartService,private route: ActivatedRoute,private router: Router,private location: Location) {
                       
                        
                       }
                        ngOnInit() {
                            this.cartService.snapshotChanges().subscribe(cart=> this.nums=cart.length);
                            this.carts = this.cartService.snapshotChanges();
                           
                        }
                        getTotal(price, soldqty){
                      
                            this.totalqty +=  soldqty;            
                            this.totalPrice+=  price;
                          this.finalTotal=this.totalPrice*this.totalqty;
                          this.TotalTax=(this.finalTotal*this.vat)/100;

                         // return "tr";
                        }

                       onClose(){
                           this.isNull=false;
                       }
                       onGoBack(){
                           return this.router.navigate(['items']);
                          
                       }
       
       
                      
       
                     
                       }
       