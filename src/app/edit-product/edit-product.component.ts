import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from '../product';
import { Category } from '../category';
import { AdminPanelService } from '../admin-panel.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditProductComponent implements OnInit {

  product: Product;
  isNew: Boolean = false;
  categories: Category[] = new Array;

  constructor(
    private adminPanelService: AdminPanelService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCategories();
    var id: string;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    this.product = new Product("", "", null, "", "", null, []);
    if (id.length == 24) {
      this.getProduct(id);
      this.isNew = false;
    } else {
      this.isNew = true;
    }
  }

  public onSaveClicked() {
    this.saveProduct();
  }

  public onAddPhotosClicked() {
    this.addPhoto();
  }

  private getProduct(id: string) {
    this.productService.getProductById(id)
      .subscribe(product => this.product = product);
  }

  private getCategories() {
    this.productService.getCategories().subscribe(
      categoryList => {
        this.categories = categoryList;
      },
      err => {
        console.log(err);
      }
    );
  }

  private saveProduct() {
    if (!this.isAllFieldsFilled()) {
      alert("Wypełnij wszystkie obowiązkowe pola!");
    } else {
      if (this.isNew) {
        this.addProduct();
      } else {
        this.updateProduct();
      }
    }
  }

  private addProduct() {
    this.adminPanelService.addProduct(this.product).subscribe(
      res => {
        console.log("Added product: " + JSON.stringify(this.product));
        this.location.back();
        // this.router.navigate(['admin-panel-products']);
      },
      err => {
        console.log(err);
      }
    );
  }

  private updateProduct() {
    this.adminPanelService.updateProduct(this.product).subscribe(
      res => {
        console.log("Updated product: " + JSON.stringify(this.product));
        this.location.back();
        // this.router.navigate(['admin-panel-products']);
      },
      err => {
        console.log(err);
      }
    );
  }

  private isAllFieldsFilled(): Boolean {
    return this.product.name.length > 0 && this.product.description.length > 0 
      && this.product.price != null && this.product.category.length > 0 
      && this.product.available != null;
  }

  private addPhoto() {

  }
}
