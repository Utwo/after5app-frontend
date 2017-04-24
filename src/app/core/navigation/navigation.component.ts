import {Component} from '@angular/core';
import {StateService} from '../state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  email = '';
  showNavigation = false;
  showSearch = false;

  constructor(private state: StateService) {
  }

  get user() {
    return this.state.getUser();
  }

  get loggedIn() {
    return this.state.isLoggedIn();
  }

  toggleNavigation() {
    this.showNavigation = !this.showNavigation;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
