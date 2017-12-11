import { Injectable } from '@angular/core';
import { Product } from './product';
import { Order } from './order';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthHttp } from 'angular2-jwt';
import { Response } from '@angular/http';
import { Http, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppSettings } from './app-settings';

@Injectable()
export class AdminPanelService {

  private productList: Product[] = new Array;
  private newProduct: Product;

  constructor(private httpClient: HttpClient, private authHttp: AuthHttp) { }

  public getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(AppSettings.API_URL + '/products')
      .pipe(catchError(this.handleError('getProducts', [])));
  }

  public addProduct(product: Product): Observable<Response> {
    this.newProduct = new Product(product.name, product.description, product.price,
      product.category, product.moreDescription, product.available, product.photos);
    console.log("New product: " + JSON.stringify(this.newProduct));

    return this.authHttp.post(AppSettings.API_URL + '/product', this.newProduct);
  }

  public updateProduct(product: Product): Observable<Response> {
    return this.authHttp.put(AppSettings.API_URL + '/product/' + product._id, product);
  }

  public deleteProduct(product: Product): Observable<Response> {
    var productId = product._id;
    console.log("Service got product to remove: " + productId);
    return this.authHttp.delete(AppSettings.API_URL + "/delete/" + productId);
  }

  public getWaitingOrders(): Observable<Response> {
    return this.authHttp.get(AppSettings.API_URL + '/waiting');
  }

  public getCompletedOrders(): Observable<Response> {
    return this.authHttp.get(AppSettings.API_URL + '/completed');
  }

  public completeOrder(order: Order): Observable<Response> {
    return this.authHttp.put(AppSettings.API_URL + '/complete/' + order._id, order);
  }

  public saveDiscount(products: Product[], discountValue: number, discountTime: number): Observable<Response> {
    let discoutData = {
      products: products,
      discountValue: discountValue,
      discountTime: discountTime
    }
    return this.authHttp.post(AppSettings.API_URL + '/discount', discoutData);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert("Coś poszło nie tak...");
      return of(result as T);
    }
  }
}
