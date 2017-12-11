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
    // this.photos = [ 
    //   "https://4.allegroimg.com/s512/01e9ca/90a56ebe470e9158e52a4023b934",
    //   "https://5.allegroimg.com/s512/0310ef/0919d53f40b98854a02c7fb7dd95",
    //   "https://2.allegroimg.com/original/01b5b6/cbf769a549f9aadfb10ac748efd2",
    //   "https://7.allegroimg.com/original/01e837/fdec88a34093baa1de0eccb488b7",
    //   "https://c.allegroimg.com/original/03c98d/307b6196494dbd67107c26ae5afc"
    // ];
    // this.mainPhoto = this.photos[0];
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
        // if (product.photos != null && product.photos.length > 0) {
        //   this.mainPhoto = product.photos[0];
        // }
        console.log(JSON.stringify(this.product));
      });
  }

}
