import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProfileService {
  options = null;

  constructor(private state: StateService, private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    this.options = new RequestOptions({headers: headers});
  }

  public getUser(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + id + '?with[]=skill&with[]=project&with[]=favorite')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateUser(user) {
    let body = JSON.stringify(user);
    return this.http.put(environment.URL_API + environment.API_VERSION + 'user', body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public updateUserSkills(user) {
    let body = JSON.stringify(user);
    return this.http.put(environment.URL_API + environment.API_VERSION + 'user/skill', body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getAppliedProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=user&with[]=favorite&with[]=position.member&with[]=position.skill&application:user_id='+this.state.getUser().id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMyProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=favorite&with[]=position.skill&with[]=user&user:user_id=' + this.state.getUser().id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getFavoriteProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=favorite&with[]=position.skill&with[]=user&favorite:user_id=' + this.state.getUser().id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
