import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    var id: string;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.product = new Product("", "", null, "", "", null, []);
    this.getProduct(id);
  }
  
  public onBackButtonClicked() {
    this.location.back();
  }

  private getProduct(id: string) {
    this.productService.getProductById(id)
      .subscribe(product => this.product = product);
  }

}
