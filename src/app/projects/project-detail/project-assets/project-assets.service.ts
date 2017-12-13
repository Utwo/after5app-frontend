import {Injectable} from '@angular/core';
import {StateService} from '../../../core/state.service';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/throw";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class ProjectAssetsService {

  constructor(private state: StateService, private http: HttpClient) {
  }

  addAsset(info) {
    const body = JSON.stringify(info);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });


    return this.http.post(environment.URL_API + environment.API_VERSION +
      'assets', body, {headers: headers})
      .catch(this.handleError);
  }

  downloadAllAsset(info) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'assets', {headers: headers})
      .catch(this.handleError);
  }

  getAll(project_id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/assets?with=user', {headers: headers})
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
