import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {StateService} from "../services/state.service";

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

    constructor(private loginService:LoginService, private state:StateService) {
        this.user = this.state.getUser();
    }

    user = {};

    get loggedIn() {
        return this.state.isLoggedIn();
    }

    ngOnInit() {
    }

    login() {
        this.loginService.login();
    }

}
