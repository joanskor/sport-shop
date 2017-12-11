import { Injectable } from '@angular/core';
import { Product } from './product';
import { Category } from './category';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AppSettings } from './app-settings';
import * as io from 'socket.io-client';
import { connect } from 'net';

@Injectable()
export class ProductService {

  private productList: Product[] = new Array;
  private categories: Category[];

  private url = 'http://localhost:5000';  
  private socket;

  constructor(private httpClient: HttpClient) { 
    this.getMessages();
  }

  getMessages() {
    this.socket = io.connect(this.url);
    this.socket = io(this.url);
    this.socket.on('messages', function (data) {
      alert(data.message);   
    });
  }  

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
    return this.httpClient.get<Product>(AppSettings.API_URL + '/product/' + id);
  }

  public increaseProductAvailability(productId: string) {
    this.productList.find(prod => prod._id === productId).available += 1;
  }

  public descreaseProductAvailability(productId: string) {
    this.productList.find(prod => prod._id === productId).available -= 1;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // alert("Coś poszło nie tak...");
      return of(result as T);
    }
  }

  public setProductList(products: Product[]) {
    this.productList = products;
  }
}
