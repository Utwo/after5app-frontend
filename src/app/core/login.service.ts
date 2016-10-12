import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {environment} from "../../environments/environment";
import {StateService} from "../shared/state.service";

@Injectable()
export class LoginService {

    constructor(private state:StateService, private http:Http) {
    }

    login() {
        var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

        this.http.post(environment.URL_API, '', {headers: headers})
            .map(res => res.json())
            .subscribe(
                (data) => this.state.storeState(data['jwt-token'], data['user']),
                (error) => this.handleError(error)
            );
    }

    logout(){
        this.state.logout();
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
