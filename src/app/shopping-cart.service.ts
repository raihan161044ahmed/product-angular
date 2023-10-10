import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from './product/product-model/shopping-cart.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: ShoppingCart[] = [];
  private cartSubject = new BehaviorSubject<ShoppingCart[]>([]);

  private apiUrl = 'https://localhost:7200/api/ShoppingCart'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getItems() {
    return this.cartSubject.asObservable();
  }
  getShoppingCartItems(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(`${this.apiUrl}/shopping-cart-items`);
  }
  addItem(item: ShoppingCart) {
    this.cartItems.push(item);
    this.cartSubject.next([...this.cartItems]);
  }

  removeItem(item: ShoppingCart) {
    const index = this.cartItems.findIndex((i) => i.productId === item.productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next([...this.cartItems]);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}
