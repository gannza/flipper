export interface ItemsInStock {  
    in_date:Date;
    in_quantity:number;
    itemId:string;
    available:boolean;
 }
export interface ItemInStockId extends ItemsInStock { itemId: string; }