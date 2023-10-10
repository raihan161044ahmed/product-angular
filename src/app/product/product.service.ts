import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product-model/product.model';
@Injectable( {
  providedIn: 'root',
} )
export class ProductService
{
  private apiUrl = 'https://localhost:7200/api/ProductApi';
  constructor ( private http: HttpClient ) { }

  addProduct ( product: Product ): Observable<Product>
  {
    return this.http.post<Product>( this.apiUrl, product );
  }
  getProducts (): Observable<Product[]>
  {
    return this.http.get<Product[]>( `${ this.apiUrl }` );
    // Add more methods for other API operations (e.g., add, update, delete)
  }
}
