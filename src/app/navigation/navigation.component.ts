import {Component, OnInit, ViewChild} from '@angular/core';
import {StateService} from "../shared/state.service";
import {LoginService} from "../core/login.service";
import {ModalDirective} from "ng2-bootstrap";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  errorMessage = '';

  constructor(private loginService: LoginService, private state: StateService) {
  }

  get user() {
    return this.state.getUser();
  }

  get loggedIn() {
    return this.state.isLoggedIn();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login();
  }

  loginByEmail(email) {
    this.loginService.loginEmail(email).subscribe(
      data => console.log(data),
      error => this.errorMessage = error);
  }

  facebookLogin() {
    var url = 'https://www.facebook.com/v2.6/dialog/oauth?client_id=' + environment.FACEBOOK_ID + '&redirect_uri=' + environment.URL + 'auth/facebook/callback&scope=email&response_type=code';
    window.open(url, "_self");
  }

  gitHubLogin() {
    var url = 'https://github.com/login/oauth/authorize?client_id=' + environment.GITHUB_ID + '&redirect_uri=' + environment.URL + 'auth/github/callback&scope=user&response_type=code';
    window.open(url, "_self");
  }
}
