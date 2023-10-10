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
}
