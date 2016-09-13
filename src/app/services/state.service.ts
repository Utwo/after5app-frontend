import {Injectable} from '@angular/core';

@Injectable()
export class StateService {

    constructor() {
    }

    getUrl() {
        return 'http://startupper-utwo.rhcloud.com/api/v1';
    }

    storeState(token, user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    }

    getToken() {
        return localStorage.getItem("token");
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    isLoggedIn() {
        if (localStorage["token"]) {
            return true;
        }
        return false;
    }
}
