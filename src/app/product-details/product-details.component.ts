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
  photos: string[];
  mainPhoto: string;
  p: number = 1;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.mainPhoto = "https://www.socabelec.co.ke/wp-content/uploads/no-photo-14.jpg";
  }

  ngOnInit() {
    var id: string;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.product = new Product("", "", null, "", "", null, []);
    this.getProduct(id);
  }

  public onPrevClicked(photo: string) {
    this.mainPhoto = photo;
  }

  public onBackButtonClicked() {
    this.location.back();
  }

  private getProduct(id: string) {
    this.productService.getProductById(id)
      .subscribe(product => {
        this.product = product;
        console.log(JSON.stringify(this.product));
      });
  }

}
