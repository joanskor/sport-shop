import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-panel-orders-menu',
  templateUrl: './admin-panel-orders-menu.component.html',
  styleUrls: ['./admin-panel-orders-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelOrdersMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public isAdmin() {
    return localStorage.getItem('admin') != null;
  }

}
