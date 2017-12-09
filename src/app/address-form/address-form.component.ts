import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Order } from '../order';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddressFormComponent implements OnInit {

  nameSurname: string;
  address: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  getName(): string {
    return this.nameSurname;
  }

  setName(name: string) {
    this.nameSurname = name;
  }

  getAddress(): string {
    return this.address;
  }

  setAddress(address: string) {
    this.address = address;
  }

  onOrderClicked() {
    this.shoppingCartService.setClientName(this.nameSurname);
    this.shoppingCartService.setClientAddress(this.address);
    console.log("Client name: " + this.shoppingCartService.getClientName());
    console.log("Client address: " + this.shoppingCartService.getClientAddress());

    this.saveOrder();
    // this.clearAllData();
    
  }

  private saveOrder() {
    this.shoppingCartService.saveOrder().subscribe(
      (res:any) => {
        this.router.navigate(['order-sent'])
      },
      err => {
        console.log(err);
      });
  }

  private clearAllData() {
    this.address = "";
    this.nameSurname = "";
    this.shoppingCartService.clearOrderedProducts();
  }
}
