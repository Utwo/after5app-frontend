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
  email = '';
  emailMessage = '';
  showEmailInput = true;

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

  loginByEmail(email) {
    var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEx.test(this.email)) {
      this.emailMessage = 'Please enter a valid email address.';
      return;
    }
    this.emailMessage = '';

    this.loginService.loginEmail(this.email).subscribe(
      () => {
        this.emailMessage = 'We sent an email to ' + this.email + '. Please check your email and follow the link.';
        this.showEmailInput = false;
      },
      error => this.emailMessage = 'A problem occured while sending the email. We are sorry for the inconvenience. Try...',
      () => this.email = '');
  }

  facebookLogin() {
    var url = 'https://www.facebook.com/v2.6/dialog/oauth?client_id=' + environment.FACEBOOK_ID + '&redirect_uri=' + environment.URL + 'auth/facebook/callback&scope=email&response_type=code';
    window.open(url, "_self");
  }

  gitHubLogin() {
    var url = 'https://github.com/login/oauth/authorize?client_id=' + environment.GITHUB_ID + '&redirect_uri=' + environment.URL + 'auth/github/callback&scope=user&response_type=code';
    window.open(url, "_self");
  }

  closeLoginModal() {
    this.loginModal.hide();
    this.emailMessage = '';
    this.showEmailInput = true;
  }
}
