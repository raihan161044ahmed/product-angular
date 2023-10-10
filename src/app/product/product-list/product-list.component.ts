import { Component, OnInit } from '@angular/core';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItems: any[] = []; 
  constructor(
    private router: Router,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  onProductAdded() {
    // Fetch the updated product list
    this.fetchProducts();
  }
  navigateToCartPage() {
    this.router.navigate(['/cart']);
  }

  addToCart(product: any) {
    // Check if the product is already in the cart
    const existingCartItem = this.cartItems.find(item => item.productId === product.id);

    if (existingCartItem) {
      // If the product is already in the cart, increment its quantity
      existingCartItem.quantity++;
      // Update the cart item on the server
      this.shoppingCartService.updateCartItem(existingCartItem).subscribe(() => {
        // Handle the update success if needed
      });
    } else {
      // If the product is not in the cart, add it as a new cart item
      const newCartItem = {
        productId: product.id,
        productName: product.name,
        quantity: 1 // Initial quantity is 1
      };
      // Add the new cart item to the cartItems array
      this.cartItems.push(newCartItem);
      // Create the cart item on the server
      this.shoppingCartService.createCartItem(newCartItem).subscribe(() => {
        // Handle the create success if needed
      });
    }
  }
}
