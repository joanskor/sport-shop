import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminPanelService } from '../admin-panel.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {

  constructor(private adminPanelService: AdminPanelService) { }

  ngOnInit() {
  }

}
