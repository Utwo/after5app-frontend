import {Component, OnInit} from '@angular/core';
import {StateService} from "../shared/state.service";
import {LoginService} from "../core/login.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  isDropdownActiv = false;
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

    this.isDropdownActiv = false;
  }

  facebookLogin() {
    var url = 'https://www.facebook.com/v2.6/dialog/oauth?client_id=' + environment.FACEBOOK_ID + '&redirect_uri=' + environment.URL + 'auth/facebook/callback';
    window.open(url, "_self");
  }

  gitHubLogin() {
    var url = 'https://github.com/login/oauth/authorize?client_id=' + environment.GITHUB_ID + '&redirect_uri=' + environment.URL + 'auth/github/callback';
    window.open(url, "_self");
  }

  dropdown() {
    this.isDropdownActiv = !this.isDropdownActiv;
  }
}
