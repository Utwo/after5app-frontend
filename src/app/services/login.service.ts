import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http} from '@angular/http';
import {StateService} from "./state.service";

@Injectable()
export class LoginService {

    constructor(private state:StateService, private http:Http) {
    }

    login() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://startupper-utwo.rhcloud.com/token/1', '', {headers: headers})
            .map(res => res.json())
            .subscribe(
                (data) => this.state.storeState(data['jwt-token'], data['user']),
                (error) => this.handleError(error)
            );
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
