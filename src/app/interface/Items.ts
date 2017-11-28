export interface Items {   name:string;
    price:number;
    expiry_date:Date;
    category:string;
    icon:number;
    recorded_date:Date;
    sold_quantity:number;
    stock_quantity:number;
    baranchid?:number; }
export interface ItemId extends Items { itemid: string; }