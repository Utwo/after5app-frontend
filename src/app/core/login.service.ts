import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {StateService} from '../shared/state.service';
import {Router} from '@angular/router';

@Injectable()
export class LoginService {

  constructor(private state: StateService, private http: Http, private router: Router) {
  }

  loginEmail(email) {
    let body = JSON.stringify({email: email});
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(environment.URL_API + 'auth/login', body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  authEmail(token) {
    this.http.post(environment.URL_API + 'api/auth/email-authenticate/' + token, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/projects'])
      );
  }

  authFacebook(code) {
    console.log(code);
    this.http.post(environment.URL_API + 'api/auth/facebook/callback?code=' + code, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/projects'])
      );
  }

  authGitHub(code) {
    this.http.post(environment.URL_API + 'api/auth/github/callback?code=' + code, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/projects'])
      );
  }

  logout() {
    this.state.logout();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
