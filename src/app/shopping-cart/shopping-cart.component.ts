import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OrderedProduct } from '../ordered-product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit {

  orderedProducts: OrderedProduct[];
  orderedValue: number = 0;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getShoppingCart();
    this.orderedValue = this.shoppingCartService.getOrderValue();
  }

  onOrderClicked() {
    if (this.orderedProducts.length > 0) {
      this.router.navigate(['address-form']);
    } else {
      alert("Zamówienie jest puste.");
    }
  }

  private getShoppingCart(): void {
    this.shoppingCartService.getShoppingCart()
      .subscribe(orderedProducts => this.orderedProducts = orderedProducts);
  }

  private removeProductFromShoppingCart(product: OrderedProduct) {
    this.shoppingCartService.removeProduct(product);
    this.orderedValue = this.shoppingCartService.getOrderValue();
  }
}
