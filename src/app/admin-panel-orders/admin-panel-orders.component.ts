import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Order } from '../order';
import { AdminPanelService } from '../admin-panel.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-panel-orders',
  templateUrl: './admin-panel-orders.component.html',
  styleUrls: ['./admin-panel-orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelOrdersComponent implements OnInit {

  p: number = 1;
  orders: Order[] = new Array;

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.getOrders();
  }

  public onCompleteOrderClicked(order: Order) {
    this.completeOrder(order);
  }

  private getOrders() {
    this.adminPanelService.getWaitingOrders().subscribe(
      res => {
        this.orders = res.json();
      },
      err => {
        console.log(err);
      }
    );
  }

  private completeOrder(order: Order) {
    this.adminPanelService.completeOrder(order).subscribe(
      res => {
        // this.orders.splice(this.orders.indexOf(order), 1);
        this.getOrders();
      }, 
      err => {
        console.log(err);
      }
    );
  }

  public getOrderValue(order: Order): Number {
    var orderValue = 0;
    order.products.forEach(product => {
      console.log(JSON.stringify(product))
      orderValue += product.value;
    });
    return orderValue;
  }
}
