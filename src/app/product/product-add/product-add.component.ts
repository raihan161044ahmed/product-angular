import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent
{
  @Output() productAdded = new EventEmitter<void>();
  newProduct: Product = new Product(); // Initialize a new product object

  constructor(private productService: ProductService) { }

  onSubmit() {
    this.productService.addProduct(this.newProduct).subscribe(
      (response: Product) => {
        // Handle the response from the API (e.g., show a success message)
        console.log('Product added:', response);
      // Reset the form or perform any other necessary actions
      this.newProduct = new Product();
    }, (error) => {
      // Handle any errors (e.g., show an error message)
      console.error('Error adding product:', error);
    });
  }
  onAddProduct ()
  {
    this.productService.addProduct( this.newProduct ).subscribe( () =>
    {
      this.productAdded.emit();
    } );
  }
}
