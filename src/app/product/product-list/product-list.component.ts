import { Component, OnInit } from '@angular/core';
import { Product } from '../product-model/product.model';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../product-model/shopping-cart.model';
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

  addToCart(product: Product) {
    // Check if the product is already in the cart
    const existingCartItem = this.cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity++;

      this.shoppingCartService.updateCartItem(existingCartItem).subscribe(() => {
        // Handle the update success if needed
      });
    } else {
      // If the product is not in the cart, add it as a new cart item
      this.cartItems.push({ ...product, quantity: 1 });
      // Create the cart item on the server
      this.shoppingCartService.createCartItem(product).subscribe(() => {});
    }
  }
}
