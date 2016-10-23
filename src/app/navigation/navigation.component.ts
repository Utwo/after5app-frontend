import {Component, OnInit} from '@angular/core';
import {StateService} from "../shared/state.service";
import {LoginService} from "../core/login.service";

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

  dropdown() {
    this.isDropdownActiv = !this.isDropdownActiv;
  }
}
