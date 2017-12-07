                import {
                Component,
                OnInit,
                Input,
                Pipe,
                Injectable,
                ViewChild,
                ElementRef
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
import { InvoiceService } from 'app/services/Invoice.service';
import { Invoice } from 'app/class/invoice';
import { PaymentService } from 'app/services/payment.service';
import { PrintingService } from 'app/services/PrintingService';
import { ModalService } from 'app/services/modal.service';
                
                @Component({
                selector: 'AddCartItems',
                templateUrl: './addcart.component.html',
                styleUrls: ['./addcart.component.css'],
                })
                export class AddCartComponent implements OnInit {
                    getcart: AddCartId[];
                    @ViewChild('printEl') printEl: ElementRef;
                    num_invoice: number;
                   
                    vat: number=18;
                
                    showSpinner: boolean;
                    isNull: boolean=false;
                
                       carts:Observable<AddCartId[]>;
                       @Input() 
                       invoices_change: Invoice;
                       cartItem: AddCart;
                       constructor(private modalService: ModalService,private printingService: PrintingService,private payment:PaymentService,private invoice:InvoiceService,private keycode:keyGeneratorService,private itemsService: ItemsService, private cartService: AddCartService,private route: ActivatedRoute,private router: Router,private location: Location) {
                       
                        this.invoices_change = new Invoice;
                       }
                        ngOnInit() {
                            this.carts = this.cartService.snapshotChanges();
                            this.carts.subscribe(cart=>this.getcart=cart);
                            this.getInvoiceNotDone();
                           }


                           onSaveAndPrintCommand(){
                        
                              if(this.invoice.updateInvoices(this.invoices_change.invoiceId,{is_transction_done:true})) 
                               
                               for(var i=0;i<this.getcart.length;i++){
                                   let n=this.getcart.length-1;
                                   if(!(i==n)){
                                       let p={   
                                        name:this.getcart[i].item_name,
                                        price:this.getcart[i].price,
                                        payment_date:this.keycode.getDateTime(),
                                        invoice_id: this.invoices_change.invoice_number,
                                        item_id:this.getcart[i].item_id,
                                        item_quantity:this.getcart[i].out_quantity,
                                        payment_mode:'Cash',
                                        payment_status:'paid',
                                        branch_id:'1',
                                        vat:{numeric:18,sign:'%'},
                                        currency:this.getcart[i].currency
                                        
                                    
                                     }
                                     if(this.payment.create(p)[i]){
                                         console.log('reach here');
                                         this.cartService.deleteItem(this.getcart[i].cart_id)[i];
                                     }

                                   }else{
                                  //  return this.router.navigate(['items']);
                                   }
                                
                               
                               }

                           }
                           onCancelCommand(){

                           }

                           public print(): void {
                            this.printingService.print(this.printEl.nativeElement);
                         }

                         save(){
                             this.openModal('printInvo');
                         }

                         openModal(id: string){
                            let model=`model-${id}`;
                         this.modalService.open(model);
                     }
                     
                         closeModal(id: string){
                             let model=`model-${id}`;
                             this.modalService.close(model);
                         }
                     
                      
                           getInvoiceNotDone(){
                            this.invoice.get_transction_done().subscribe(invoices=>{
                             this.num_invoice=invoices.length;
                            
                             if(this.num_invoice > 0){
                             this.invoices_change.invoice_number=invoices[0].invoice_number;
                             this.invoices_change.customer_number=invoices[0].customer_number;
                             this.invoices_change.date_time=invoices[0].date_time;
                             this.invoices_change.total_amount_paid=invoices[0].total_amount_paid;
                             this.invoices_change.total_amount_vat_paid=invoices[0].total_amount_vat_paid;
                             this.invoices_change.number_items=invoices[0].number_items;
                             this.invoices_change.branch_id=invoices[0].branch_id;
                             this.invoices_change.user_id=invoices[0].user_id;
                             this.invoices_change.invoiceId=invoices[0].invoiceId;
                             
                             }
                            }
                         );
                        }

                       onClose(){
                           this.isNull=false;
                       }
                       onGoBack(){
                           return this.router.navigate(['items']);
                          
                       }
       
       
                      
       
                     
                       }
       