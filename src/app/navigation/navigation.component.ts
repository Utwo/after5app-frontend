import {Component, OnInit} from '@angular/core';
import {StateService} from "../shared/state.service";
import {LoginService} from "../core/login.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
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
}
