export interface AddCart {  
    item_id:string;
    item_name:string;
    out_quantity:number;
    price:number;
    category:string;
    currency:string;
    cart_id:string
    user_id:string;
 }
export interface AddCartId extends AddCart { cart_id: string; }