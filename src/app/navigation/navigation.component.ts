import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {StateService} from "../services/state.service";
import {NotificationsService} from "../services/notifications.service";

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
