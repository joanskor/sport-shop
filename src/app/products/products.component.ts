import { Component, OnInit, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { Category } from '../category';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsComponent implements OnInit {

  p: number = 1;
  products: Product[];
  categories: Category[];
  selectedCategory: string = "Wszystkie";
  productsAmount: number = 0;
  orderValue: number = 0;

  constructor(
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProducts(this.selectedCategory);
    this.productsAmount = this.shoppingCartService.getOrderAmount();
    this.orderValue = this.shoppingCartService.getOrderValue();
  }

  public onSelectCategory(selectedCategory: string) {
    this.p = 1;
    this.getProducts(selectedCategory);
    this.selectedCategory = selectedCategory;
  }

  public onProductClicked(product: Product) {
    this.router.navigate(['/product-details', product._id]);
  }

  public addProductToShoppingCart(product: Product) {
    this.shoppingCartService.addChosenProduct(product);
    this.productsAmount = this.shoppingCartService.getOrderAmount();
    this.orderValue = this.shoppingCartService.getOrderValue();
  }
  
  private getCategories() {
    this.productService.getCategories()
      .subscribe(categoryList => this.categories = categoryList);
  }
  
  private getProducts(category: string): void {
    if (category === "Wszystkie") {
      this.productService.getProducts()
        .subscribe(productList => this.products = productList);
    } else {
      this.productService.getProductsByCategory(category)
        .subscribe(productList => this.products = productList);
    }
  }
}