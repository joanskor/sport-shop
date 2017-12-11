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
        this.updateProductWithDiscount();
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

  private updateProductWithDiscount() {
    this.selectedProducts.forEach(element => {
      console.log(1, "Discout product: " + element);
      console.log(2, "Discout old price: " + element.price);
      let discVal = element.price*(this.discountValue/100);
      element.price = element.price - discVal;
      console.log(3, "Discout new price: " + element.price);
      this.adminPanelService.updateProduct(element).subscribe(
        res => {
          console.log("Updated product: " + JSON.stringify(element));
        },
        err => {
          console.log(err);
        }
      );
    });
    // console.log(1, "Discout product: " + this.selectedProducts[0]);
    // console.log(2, "Discout old price: " + this.selectedProducts[index].price);
    // this.selectedProducts[index].price = this.selectedProducts[index].price*(this.discountValue/100);
    // console.log(3, "Discout new price: " + this.selectedProducts[index].price);
    // this.adminPanelService.updateProduct(this.selectedProducts[index]).subscribe(
    //   res => {
    //     console.log("Updated product: " + JSON.stringify(this.selectedProducts[index]));
    //     index += 1;
    //     this.updateProductWithDiscount(index);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
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
