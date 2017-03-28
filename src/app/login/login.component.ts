import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoginService} from '../core/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  private type;
  private code;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    if (this.type === 'email') {
      this.loginService.authEmail(this.code);
    } else if (this.type === 'facebook') {
      this.loginService.authFacebook(this.code);
    } else if (this.type === 'github') {
      this.loginService.authGitHub(this.code);
    }
  }
}
