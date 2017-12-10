import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-product-discounts',
  templateUrl: './product-discounts.component.html',
  styleUrls: ['./product-discounts.component.css']
})
export class ProductDiscountsComponent implements OnInit {

  p: number = 1;
  products: Product[] = new Array;

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.getProducts();
  }

  public onSaveDiscount() {
    
  }

  private getProducts() {
    this.adminPanelService.getProducts()
      .subscribe(productList => this.products = productList);
  }

}
