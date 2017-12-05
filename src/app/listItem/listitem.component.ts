import { Component, OnInit, Input, Pipe } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Items, ItemId } from 'app/interface/Items';
import { ItemsService } from 'app/services/item.service';
import { Router } from '@angular/router';
import { ModalService } from 'app/services/modal.service';
import { AddCartService } from 'app/services/addCart.service';
import { keyGeneratorService } from 'app/services/keyGenerater.service';
import { InvoiceService } from 'app/services/Invoice.service';
import { Invoice } from 'app/class/invoice';

@Component({
  moduleId: module.id.toString(),
  selector: 'ListItems',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.css'],
})
export class ListItemsComponent implements OnInit {
    invoicedate: string;
    invoiceNumber: string;

    invoice_id: number;
    num_invoice: number;

    cart: {};
    showbtnbyitemid: any;
 items: Observable<ItemId[]>;
 showSpinner = true;
 num_stock_quantity:number;
 percentage:any;
 @Input() invoices_change: Invoice;
  constructor(private keycode:keyGeneratorService,private invoice:InvoiceService,private itemsService: ItemsService, private router: Router,private modalService: ModalService,private addcart:AddCartService){
	this.invoices_change = new Invoice;
 }


    ngOnInit() {
       
        this.items = this.itemsService.snapshotChanges();
        if(this.items){
             this.showSpinner = false;
        }
        this.getInvoiceNotDone();
           
       
    }
    onRemoveItem(itemid){
       if(confirm('are you sure you want to remove this record')){
            this.itemsService.deleteItem(itemid).then(()=> {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
   }

    showhideButton(itemid){

        this.showbtnbyitemid=itemid;
      
    }
    showshowButton(){
        this.showbtnbyitemid="";
    }

  

    
    onEditItem(itemId){
        return this.router.navigate(['editItems', itemId]);
    }
    onIncreaseItems(itemId){
        
        return this.router.navigate(['IncreaseItems', itemId]);
    }
    
   getWidth(o,i){
    const wtr=(o*100)/i;
    const w=Math.round(wtr);
    if(w<=5){
        let t=100-w;
       return t+'%';
    }else{

        return w+"%";
    }
 
   }
   getHeight(){
       return "2px";
   }
   getClass(o,i){
    let cls=null;
    const wtr=(o*100)/i;
    const w=Math.round(wtr);
    this.percentage= w +'% sold';
    if(w<=5){
        return "progress-bar bg-danger";
    } else if(w<=55){
        return "progress-bar bg-warning"; 
    } else if(w<=95){
        return "progress-bar bg-primary"; 
    }else if(w<=100){
        return "progress-bar bg-success"; 
    }
   }

   openModal(id: string){
       let model=`model-${id}`;
    this.modalService.open(model);
}

    closeModal(id: string){
        let model=`model-${id}`;
        this.modalService.close(model);
        this.num_stock_quantity=null;
    }

    getKey(){
        this.invoiceNumber='INVC-'+this.keycode.generatecode();
    }
    getReceipttime(){
        this.invoicedate=this.keycode.getDateTime();
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
        this.invoices_change.invid='6YXiXfgezA5BBigmTBxq';
        
        }
       }
    );
   }
    

    AddCart(items){

    this.getInvoiceNotDone();
   
     if(this.num_stock_quantity && this.num_stock_quantity !=null){
      
    if((items.sold_quantity > this.num_stock_quantity) || (items.sold_quantity!==0)){

        items.sold_quantity=items.sold_quantity-this.num_stock_quantity;

        if(this.num_invoice == 0){

            this.invoices_change.invoice_number='INVC-'+this.keycode.generatecode();
            this.invoices_change.date_time=this.keycode.getDateTime();
            this.invoices_change.total_amount_paid=items.price*this.num_stock_quantity;
            this.invoices_change.total_amount_vat_paid=(this.invoices_change.total_amount_paid)*18/100;
            this.invoices_change.number_items=1;
            this.invoices_change.customer_number=null;
            this.invoices_change.branch_id='1';
            this.invoices_change.user_id='1';
            this.invoices_change.is_transction_done=false;
     
        }else{
            this.invoices_change.invoice_number=this.invoices_change.invoice_number;
            this.invoices_change.date_time=this.invoices_change.date_time;
            this.invoices_change.total_amount_paid=this.invoices_change.total_amount_paid+items.price*this.num_stock_quantity;
            this.invoices_change.total_amount_vat_paid=(this.invoices_change.total_amount_paid)*18/100;
            this.invoices_change.number_items= this.invoices_change.number_items+1;
            this.invoices_change.customer_number=null;
            this.invoices_change.branch_id='1';
            this.invoices_change.user_id='1';
            this.invoices_change.is_transction_done=false;

        
            this.invoice.updateInvoices(this.invoices_change.invid,
            {
                number_items:this.invoices_change.number_items,
                total_amount_paid:this.invoices_change.total_amount_paid,
                total_amount_vat_paid:  this.invoices_change.total_amount_vat_paid


            });  
        }

        
         if(this.addcart.create({ 
            item_id:items.itemid,
            item_name:items.name,
            out_quantity:this.num_stock_quantity,
            price:items.price,
            category:items.category,
            currency:'Rwf',
            user_id:'1'
        })){

             this.itemsService.updateItem(items.itemid,items);
             this.num_stock_quantity=null;
             return this.router.navigate(['addcartItems']);

            }
            
       
    }else{
        alert('please,quantity rest must be greater than ('+this.num_stock_quantity+'). (rest qty:'+items.sold_quantity+')'); 
    }
     
     
     }else{
         alert('(1) field is required');
     }
     
    }
   
}