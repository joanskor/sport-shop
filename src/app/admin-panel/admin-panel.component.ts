import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPanelService } from '../admin-panel.service';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPanelComponent implements OnInit {

  constructor(
    private adminPanelService: AdminPanelService,
    private loginRegisterService: LoginRegisterService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') != null;
  }

  backToMain() {
    this.router.navigate(['products']);
  }

  logout() {
    this.loginRegisterService.logout();
    localStorage.removeItem('admin');
    this.router.navigate(['login']);
  }

  public isAdmin() {
    return localStorage.getItem('admin') != null;
  }
}
