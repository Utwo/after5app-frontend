import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProfileService {

  constructor(private state: StateService, private http: HttpClient) {
  }

  public getUser(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + id + '?with[]=skill&with[]=project&with[]=favorite')
      .catch(this.handleError);
  }

  public getLoggedInUser() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'user/' + this.state.getUser().id + '?with[]=skill')
      .catch(this.handleError);
  }

  public updateUser(user) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.put(environment.URL_API + environment.API_VERSION + 'user', body, {
      headers: headers,
    })
      .catch(this.handleError);
  }

  public getMyApplications() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION + 'application/user?with[]=position.project', {
      headers: headers,
    })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
