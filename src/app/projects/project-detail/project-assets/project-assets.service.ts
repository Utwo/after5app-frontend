import {Injectable} from '@angular/core';
import {StateService} from '../../../core/state.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../../../environments/environment.dev';
import {Observable} from 'rxjs/Observable';
@Injectable()

export class ProjectAssetsService {

  constructor(private state: StateService, private http: Http) {
  }

  addAsset(info) {
    const body = JSON.stringify(info);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    const options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION +
      'assets', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  downloadAllAsset(info) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'assets', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAll(project_id) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/assets?with=user', options)
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
