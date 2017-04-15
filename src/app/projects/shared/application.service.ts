import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../core/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApplicationService {

  constructor(private state: StateService, private http: Http) {
  }

  public getApplications(project_id) {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project/' + project_id +
      '/application?with[]=user&with[]=position.skill', {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  applyForProject(application) {
    const body = JSON.stringify(application);
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION + 'application', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public acceptApplication(application_id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.put(environment.URL_API + environment.API_VERSION +
      'application/' + application_id, {}, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public declineApplication(application_id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.delete(environment.URL_API + environment.API_VERSION +
      'application/' + application_id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
