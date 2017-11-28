import { Component, OnInit, Input, Pipe } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { newItems } from 'app/class/Items';
import { Items, ItemId } from 'app/interface/Items';
import { ItemsService } from 'app/services/item.service';
import { ItemsInStockService } from 'app/services/ItemsInStock.service';

@Component({
  selector: 'AddItems',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AddItemsComponent implements OnInit {
    showbtnbyitemid: any;
  
    iscategoryNull: boolean;
    isstock_quantityNull: boolean;
    ispriceNull: boolean;
    isnameNull: boolean;

 itemObj: newItems;
 items: Observable<ItemId[]>;
  @Input() item: newItems;
  constructor(private itemsService: ItemsService,private instockService:ItemsInStockService){
	
 }

 

    ngOnInit() {
        this.item = new newItems();
        this.items = this.itemsService.snapshotChanges();
       
    }

    showhideButton(itemid){

        this.showbtnbyitemid=itemid;
      
    }

    
   getWidth(o,i){
    const wtr=(o*100)/i;
    const w=Math.round(wtr);
   return w+"%";
   }
   getHeight(){
       return "2px";
   }
   getClass(o,i){
    let cls=null;
    const wtr=(o*100)/i;
    const w=Math.round(wtr);
    if( w <=25 ){
        return "progress-bar bg-danger";
    } else if(w<=55){
        return "progress-bar bg-warning"; 
    } else if(w<=75){
        return "progress-bar bg-primary"; 
    }else if(w<=100){
        return "progress-bar bg-success"; 
    }
   }
    onRemoveItem(itemid){
        console.log(itemid);
       if(confirm('are you sure you want to remove this record')){
            this.itemsService.deleteItem(itemid).then(()=> {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
        }
   }
    onSaveItem(){

                if(this.item.name=="" || this.item.name==null){
                this.isnameNull=true; 
                }
                if(this.item.price==0 || this.item.price==null){
                    this.ispriceNull=true; 
                }
                if(this.item.stock_quantity==0 || this.item.stock_quantity==null){
                    this.isstock_quantityNull=true; 
                }
                if(this.item.category=="Choose Category" || this.item.category=="" || this.item.stock_quantity==null){
                    this.iscategoryNull=true; 
                }
                
                if(this.item){
                    this.item.sold_quantity=this.item.stock_quantity;
                    this.item.icon=612;
                    this.item.id=1;
                    this.item.recorded_date=new Date();

                    if(this.item.expiry_date){
                            
                    this.item.expiry_date=new Date(this.item.expiry_date);
                    }
                    
                        this.itemsService.create(this.item)
                        .then((docRef)=> {

                               if(this.instockService.create({item_id:docRef.id,in_quantity:this.item.stock_quantity,in_date:new Date(),available:true})){
                                
                                alert('successfully recorded!');
                                return this.item=null;
                               }
                                
                            
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                        });
                }
        }
}