import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from "./state.service";

@Injectable()
export class ProfileService {

    constructor(private state:StateService, private http:Http) {
    }

    public getUser(id) {
        return this.http.get(this.state.getUrl() + '/user/' + id + '?with[]=skill&with[]=project&with[]=favorite')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getLoggedInUser() {
        return this.http.get(this.state.getUrl() + '/user/' + this.state.getUser().id + '?with[]=skill')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public updateUser(user) {
        let body = JSON.stringify(user);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.state.getUrl() + '/user', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getMyApplications(){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.state.getUrl() + '/application/user?with[]=position.project', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res:Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
