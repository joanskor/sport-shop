import { Injectable } from '@angular/core';
import { Product } from './product';
import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettings } from './app-settings';

@Injectable()
export class ProductService {

  private productList: Product[] = new Array;
  private categories: Category[];

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(AppSettings.API_URL + '/categories')
      .pipe(catchError(this.handleError('getCategories', [])));
  }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(AppSettings.API_URL + '/products')
      .pipe(catchError(this.handleError('getProducts', [])));
  }

  public getProductsByCategory(selectedCategory: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(AppSettings.API_URL + '/category/' + selectedCategory)
      .pipe(catchError(this.handleError('getProductsByCategory', [])));
  }

  public getFilteredProducts(selectedCategory: string): Observable<Product[]> {
    console.log("Selected category: " + selectedCategory);
    if (selectedCategory == "Wszystkie") {
      return this.getProducts();
    } else {
      var filteredProducts = new Array;
      this.getProducts().subscribe(productList => this.productList = productList);
      this.productList.forEach(element => {
        if (element.category === selectedCategory) {
          filteredProducts.push(element);
        }
      });
      return of(filteredProducts);
    }
  }

  public getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(AppSettings.API_URL+ '/product/' + id);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert("Coś poszło nie tak...");
      return of(result as T);
    }
  }
}
