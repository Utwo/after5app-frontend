import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {LoginService} from '../../core/login.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html'
})

export class LoginModalComponent {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  email = '';
  emailMessage = '';
  showEmailInput = true;

  constructor(private loginService: LoginService) {
  }

  loginByEmail(email) {
    let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    const url = 'https://www.facebook.com/v2.6/dialog/oauth?client_id=' + environment.FACEBOOK_ID + '&redirect_uri='
      + environment.URL + 'auth/facebook/callback&scope=email&response_type=code';
    window.open(url, '_self');
  }

  gitHubLogin() {
    const url = 'https://github.com/login/oauth/authorize?client_id=' + environment.GITHUB_ID + '&redirect_uri='
      + environment.URL + 'auth/github/callback&scope=user:email&response_type=code';
    window.open(url, '_self');
  }

  open() {
    this.loginModal.show();
  }

  closeLoginModal() {
    this.loginModal.hide();
    this.emailMessage = '';
    this.showEmailInput = true;
  }
}
