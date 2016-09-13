import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {StateService} from "./state.service";

@Injectable()
export class ProjectService {

    constructor(private state:StateService, private http:Http) {
    }

    public getProjects(){
        return this.http.get(this.state.getUrl()+'/project')
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
