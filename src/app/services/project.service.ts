import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from "./state.service";

@Injectable()
export class ProjectService {

    constructor(private state:StateService, private http:Http) {
    }

    public getProjects(page) {
        //noinspection TypeScriptUnresolvedFunction,TypeScriptUnresolvedFunction
        return this.http.get(this.state.getUrl() + '/project?with[]=user&page=' + page)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getProjectById(id) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.state.getUrl() +
            '/project?with[]=user&with[]=position.skill&id=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getProjectComments(id) {
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.state.getUrl() +
            '/project?with[]=comment.user&id=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addComment(comment) {
        let body = JSON.stringify(comment);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.state.getUrl() + '/comment', body, options)
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
