import { Component, OnInit, Input, Pipe } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Items, ItemId } from 'app/interface/Items';
import { ItemsService } from 'app/services/item.service';
import { Router } from '@angular/router';
import { ModalService } from 'app/services/modal.service';
import { AddCartService } from 'app/services/addCart.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'ListItems',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.css'],
})
export class ListItemsComponent implements OnInit {
    cart: {};
    showbtnbyitemid: any;
 items: Observable<ItemId[]>;
 showSpinner = true;
 num_stock_quantity:number;
 percentage:any;
  constructor(private itemsService: ItemsService, private router: Router,private modalService: ModalService,private addcart:AddCartService){
	
 }


    ngOnInit() {
        this.items = this.itemsService.snapshotChanges();
        if(this.items){
             this.showSpinner = false;
        }
           
       
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

    
    AddCart(items){
    
     if(this.num_stock_quantity && this.num_stock_quantity !=null){
       this.cart={ 
        item_id:items.itemid,
        item_name:items.name,
        out_quantity:this.num_stock_quantity,
        price:items.price,
        category:items.category,
        currency:'Rwf',
        user_id:'1'
    };
    if((items.sold_quantity > this.num_stock_quantity) || (items.sold_quantity!==0)){

        items.sold_quantity=items.sold_quantity-this.num_stock_quantity;
        
         if(this.addcart.create(this.cart)){

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