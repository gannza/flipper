export interface Payments {   
    name:string;
    price:number;
    payment_date:Date;
    invoice_id:string;
    item_id:string;
    item_quantity:number;
    payment_mode:string;
    payment_status:string;
    branch_id?:string;
    vat:{numeric:number,sign:string};
    currency:string;
    

 }