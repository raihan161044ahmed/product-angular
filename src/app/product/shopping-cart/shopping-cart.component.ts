import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { ShoppingCart } from '../product-model/shopping-cart.model';
@Component( {
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: [ './shopping-cart.component.scss' ]
} )
export class ShoppingCartComponent implements OnInit
{
  cartItems: ShoppingCart[] = [];

  constructor ( private shoppingCartService: ShoppingCartService ) { }

  ngOnInit (): void
  {
    this.shoppingCartService.getItems().subscribe( ( items ) =>
    {
      this.cartItems = items;
    } );
  }
  getShoppingCartItems (): void
  {
    this.shoppingCartService.getShoppingCartItems()
      .subscribe( items =>
      {
        this.cartItems = items;
      } );
  }
  increaseQuantity ( item: any ): void
  {
    item.quantity += 1; // Increase quantity by 1
    this.updateCartItem( item );
  }

  decreaseQuantity ( item: any ): void
  {
    if ( item.quantity > 1 )
    {
      item.quantity -= 1; // Decrease quantity by 1, but ensure it doesn't go below 1
      this.updateCartItem( item );
    }
  }

  updateCartItem ( item: any ): void
  {
    // Implement logic to update the cart item on the server (e.g., using a service)
    this.shoppingCartService.updateCartItem( item )
      .subscribe( () =>
      {
        // Successfully updated item, no need for further action
      } );
  }
}
