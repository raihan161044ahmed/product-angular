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
}
