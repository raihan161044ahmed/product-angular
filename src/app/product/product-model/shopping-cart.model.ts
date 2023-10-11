import { Product } from "./product.model";

export class ShoppingCart
{
    productId: number=0;
     Name: string='';
    quantity: number = 0;
    price: number = 0;
    products: Product=new Product(); 
}


export interface Products {
    id: number;
    name: string;
    price: number;
    description: string;
  }