import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private state: StateService, private http: Http) {
  }

  public getUser(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + id + '?with[]=skill&with[]=project&with[]=favorite')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getLoggedInUser() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + this.state.getUser().id + '?with[]=skill')
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
    return this.http.put(environment.URL_API + environment.API_VERSION + 'user', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMyApplications() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=user&with[]=favorite&with[]=position.member&with[]=position.skill&application:user_id='+this.state.getUser().id + '&application:accepted=0', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMyProjects() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=favorite&with[]=position.skill&with[]=user&user:user_id=' + this.state.getUser().id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getFavoriteProjects() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=favorite&with[]=position.skill&with[]=user&favorite:user_id=' + this.state.getUser().id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getJoinedProjects() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'project?with[]=favorite&with[]=user&with[]=position.member&with[]=position.skill&application:user_id='+this.state.getUser().id +'&application:accepted=1', options)
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
