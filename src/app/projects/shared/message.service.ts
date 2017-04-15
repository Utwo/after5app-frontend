import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../core/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class MessageService {

  constructor(private state: StateService, private http: Http) {
  }

  public getProjectMessages(project_id, page) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/messenger?sort[]=created_at,desc&page=' + page, options)
      .map(res => res.json().messenger)
      .catch(this.handleError);
  }

  public addMessage(project_id, message) {
    const body = JSON.stringify({text: message, project_id: project_id});
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION + 'messenger', body, options)
      .map(res => res.json().messenger)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
