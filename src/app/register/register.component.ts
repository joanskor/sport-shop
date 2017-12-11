import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  passwordConf: string;

  constructor(
    private  loginRegisterService: LoginRegisterService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public register() {
    if (this.username != null && this.password != null && this.password != null && this.passwordConf != null && this.email != null) {
      this.loginRegisterService.register(this.username, this.password, this.email, this.passwordConf)
        .subscribe(
          (res:any) => {
            this.router.navigate(['login']);
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
