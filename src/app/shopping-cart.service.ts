import { Injectable } from '@angular/core';
import { OrderedProduct } from './ordered-product';
import { Product } from './product';
import { Order } from './order'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './app-settings';

@Injectable()
export class ShoppingCartService {

  private chosenProducts: Product[] = new Array;
  private orderedProducts: OrderedProduct[] = new Array;
  private clientName: string = "";
  private clientAddress: string = "";
  private order: Order;

  constructor(private httpClient: HttpClient) { }

  getShoppingCart(): Observable<OrderedProduct[]> {
    return of(this.orderedProducts);
  }

  public setClientName(clientName: string) {
    this.clientName = clientName;
  }

  public getClientName(): string {
    return this.clientName;
  }
  
  public setClientAddress(clientAddress: string) {
    this.clientAddress = clientAddress;
  }

  public getClientAddress(): string {
    return this.clientAddress;
  }

  public addChosenProduct(newChosenProduct: Product) {
    var alreadyExists = false;
    console.log("Add product: " + newChosenProduct.name);
    this.orderedProducts.forEach(element => {
      if (element.getProduct() == newChosenProduct) {
        element.setAmount(element.getAmount()+1);
        console.log("Zmieniono ilość: " + element.getAmount());
        alreadyExists = true;
      }
    });

    if (!alreadyExists) {
      this.orderedProducts.push(new OrderedProduct(1, newChosenProduct));
      console.log("Dodano nowy produkt");
    }
  }

  public removeProduct(productToRemove: OrderedProduct) {
    if (this.orderedProducts.includes(productToRemove)) {
      
      if (productToRemove.getAmount() > 1) {
        productToRemove.setAmount(productToRemove.getAmount() - 1);
      }
      else if (productToRemove.getAmount() == 1) {
        var product = this.orderedProducts.find(obj => obj.getProduct().name === productToRemove.getProduct().name);
        var index = this.orderedProducts.indexOf(product);
        this.orderedProducts.splice(index, 1);
      } else {
        console.log("Brak");
      }
    } 
  }

  public getOrderAmount(): number {
    var amount = 0;
    this.orderedProducts.forEach(element => {
      amount += element.getAmount();
    });
    console.log("Amount " + amount);
    return amount;
  }

  public getOrderValue(): number {
    var value = 0;
    this.orderedProducts.forEach(element => {
      value += element.getValue();
    });
    console.log("Value " + value);
    return value;
  }

  public clearOrderedProducts() {
    this.chosenProducts.splice(0, this.chosenProducts.length);
    this.orderedProducts.splice(0, this.orderedProducts.length);
    this.clientAddress = "";
    this.clientName = "";
    this.order = null;
  }
  
  public saveOrder(): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.prepareOrder();
    return this.httpClient.post<Order>(AppSettings.API_URL + '/order', this.order, httpOptions)
      .pipe(
        tap((order: Order) => console.log(JSON.stringify(order))),
        catchError(this.handleError<Order>('Add order'))
      );
  }

  private prepareOrder() {
    this.order =  new Order(this.orderedProducts, this.clientName, this.clientAddress);
    console.log("Order json:" + JSON.stringify(this.order));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      alert("Coś poszło nie tak...");
      return of(result as T);
    }
  }
}