import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { ShoppingCart } from '../product-model/shopping-cart.model';
@Component( {
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: [ './shopping-cart.component.scss' ]
} )
export class ShoppingCartComponent implements OnInit {
  cartItems: ShoppingCart[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.getShoppingCartItems();
  }

  getShoppingCartItems(): void {
    this.shoppingCartService.getShoppingCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: ShoppingCart): void {
    item.quantity += 1;
    this.updateCartItem(item);
  }

  decreaseQuantity(item: ShoppingCart): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCartItem(item);
    }
  }

  updateCartItem(item: ShoppingCart): void {
    this.shoppingCartService.updateCartItem(item).subscribe(() => {
      // Successfully updated item, no need for further action
    });
  }
}





