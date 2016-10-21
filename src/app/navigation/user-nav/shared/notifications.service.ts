import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from "../../../shared/state.service";

@Injectable()
export class NotificationsService {

    constructor(private state: StateService, private http: Http) {
    }

    public getNotificationsCount() {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.state.getUrl() + '/notification/count', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    public getNotifications() {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.state.getUrl() + '/notification', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}