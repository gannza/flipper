export interface Invoices { 
    invid:string;
    invoice_number:string; 
    branch_id:string;
    customer_number?:string;
    date_time:string;
    is_transction_done:boolean;
    number_items:number;
    total_amount_paid:number;
    total_amount_vat_paid:number;
    user_id:string;
    id:string
 }
 export interface InvoiceId extends Invoices { invid: string }