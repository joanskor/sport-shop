import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Product } from '../product';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-admin-panel-products',
  templateUrl: './admin-panel-products.component.html',
  styleUrls: ['./admin-panel-products.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelProductsComponent implements OnInit {

  p: number = 1;
  products: Product[];

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.getProducts();
  }

  public onDeleteClicked(product: Product) {
    this.deleteProduct(product);
  }

  private getProducts() {
    this.adminPanelService.getProducts()
      .subscribe(productList => this.products = productList);
  }

  private deleteProduct(product: Product) {
    this.adminPanelService.deleteProduct(product).subscribe(
      res => {
        console.log("Deleted:" + JSON.stringify(product));
        this.getProducts();
      },
      err => {
        console.log(err);
      }
    );
  }
}
