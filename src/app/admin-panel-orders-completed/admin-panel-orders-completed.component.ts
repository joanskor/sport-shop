import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Order } from '../order';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-admin-panel-orders-completed',
  templateUrl: './admin-panel-orders-completed.component.html',
  styleUrls: ['./admin-panel-orders-completed.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelOrdersCompletedComponent implements OnInit {

  p: number = 1;
  completedOrders: Order[];

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
    this.getCompletedOrders();
  }

  private getCompletedOrders() {
    this.adminPanelService.getCompletedOrders().subscribe(
      res => {
        this.completedOrders = res.json();
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
