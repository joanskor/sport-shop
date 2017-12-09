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
    this.loginRegisterService.login(this.username, this.password).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['admin-panel']);
      },
      err => {
        console.log(err);
    });
  }

}
