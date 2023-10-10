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

  private apiUrl = 'https://localhost:7253/api/shoppingcart'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getItems() {
    return this.cartSubject.asObservable();
  }

  getShoppingCartItems(): Observable<ShoppingCart[]> {
    return this.http.get<ShoppingCart[]>(`${this.apiUrl}/items`);
  }

  addItem(item: ShoppingCart): Observable<ShoppingCart> {
    return this.http.post<ShoppingCart>(`${this.apiUrl}/add`, item);
  }

  createCartItem(cartItem: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cartItem);
  }

  removeItem(item: ShoppingCart): Observable<any> {
    const url = `${this.apiUrl}/remove/${item.productId}`; // Assuming 'id' is the unique identifier for items
    return this.http.delete(url);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }

  updateCartItem(item: any): Observable<any> {
    const url = `${this.apiUrl}/update/${item.id}`; // Assuming 'id' is the unique identifier for items
    return this.http.put(url, item);
  }
}







