import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from '../product';
import { AdminPanelService } from '../admin-panel.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-product-discounts',
  templateUrl: './product-discounts.component.html',
  styleUrls: ['./product-discounts.component.css']
})
export class ProductDiscountsComponent implements OnInit {

  p: number = 1;
  products: Product[] = new Array;
  selectedProducts: Product[] = new Array;
  discountValue: number;
  discountTime: number; // minutes

  constructor(
    private adminPanelService: AdminPanelService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  public onSelectProduct(product: Product) {
    let index;
    let exists = false;
    this.selectedProducts.forEach(element => {
      if (element._id === product._id) {
        index = this.selectedProducts.indexOf(element);
        exists = true;
      }
    });

    if (exists) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(product);
    }
    console.log("Selected product: " + JSON.stringify(product));
    console.log("List: " + JSON.stringify(this.selectedProducts));
  }

  public isSelected(product: Product): boolean {
    let exists = false;
    this.selectedProducts.forEach(element => {
      if (element._id === product._id) {
        exists = true;
      }
    });
    return exists;
  }
  
  public onSaveDiscount() {
      if (this.isAllFieldsFilled()) {
        this.adminPanelService.saveDiscount(this.selectedProducts, this.discountValue, this.discountTime).subscribe(
          res => {
            console.log("Utworzono promocję");
            this.location.back();
            // this.router.navigate(['admin-panel-products']);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        alert("Wypełnij wszystkie pola i wybierz co najmniej jeden produkt");
      }
  }

  private isAllFieldsFilled(): boolean {
    return this.selectedProducts.length > 0 
      && this.discountTime != null 
      && this.discountTime != null;
  }

  private getProducts() {
    this.adminPanelService.getProducts()
      .subscribe(productList => this.products = productList);
  }

}
