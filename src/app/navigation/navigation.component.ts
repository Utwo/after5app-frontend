import {Component, OnInit, ViewChild} from '@angular/core';
import {StateService} from "../shared/state.service";
import {LoginService} from "../core/login.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @ViewChild('loginModal') public loginModal: ModalDirective;
  isDropdownActive = false;
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

    this.isDropdownActive = false;
  }

  dropdown() {
    this.isDropdownActive = !this.isDropdownActive;
  }
}
