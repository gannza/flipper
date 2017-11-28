export interface ItemsInStock {  
    in_date:Date;
    in_quantity:number;
    item_id?:string;
    available:boolean
 }
export interface ItemId extends ItemsInStock { item_In_id: string; }