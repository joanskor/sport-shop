import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private  loginRegisterService: LoginRegisterService,
    private router: Router
  ) { }

  ngOnInit() {
  }
 
  login() {
    if (this.username != null && this.password != null) {
      this.loginRegisterService.login(this.username, this.password).subscribe(
        (res:any) => {
          localStorage.setItem('token', res.token);
          if (this.username === "admin") {
            localStorage.setItem('admin', 'true');
            this.router.navigate(['admin-panel']);
          } else {
            this.router.navigate(['products']);
          }
        },
        err => {
          console.log(err);
      });
    }
  }

  back() {
    this.router.navigate(['products']);
  }

}
