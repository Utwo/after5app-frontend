import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import "rxjs/add/observable/throw";
import {StateService} from '../../core/state.service';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProfileService {
  options = null;

  constructor(private state: StateService, private http: HttpClient) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    this.options = {headers: headers};
  }

  public getUser(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + id + '?with[]=skill&with[]=project&with[]=favorite')
      .catch(this.handleError);
  }

  public updateUser(user) {
    const body = JSON.stringify(user);
    return this.http.put(environment.URL_API + environment.API_VERSION + 'user', body, this.options)
      .catch(this.handleError);
  }

  public updateUserSkills(user) {
    const body = JSON.stringify(user);
    return this.http.put(environment.URL_API + environment.API_VERSION + 'user/skill', body, this.options)
      .catch(this.handleError);
  }

  public getAppliedProjects() {
    return this.http.get(environment.URL_API +
      environment.API_VERSION +
      'project?with[]=user&with[]=favorite&with[]=position.member&with[]=position.skill&application:user_id=' +
      this.state.getUser().id,
      this.options
    )
      .catch(this.handleError);
  }

  public getMyProjects() {
    return this.http.get(environment.URL_API +
      environment.API_VERSION +
      'project?with[]=favorite&with[]=position.skill&with[]=user&user:user_id=' +
      this.state.getUser().id,
      this.options
    )
      .catch(this.handleError);
  }

  public getFavoriteProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?with[]=favorite&with[]=position.skill&with[]=user&favorite:user_id=' +
      this.state.getUser().id,
      this.options
    )
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
