import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map';
import {LoginService} from "../core/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private type;
  private token;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  ngOnInit() {
    if (this.type === 'email') {
      this.loginService.authEmail(this.token);
    }
    else if (this.type === 'facebook') {
    }
    else if (this.type === 'github') {
    }
  }
}
