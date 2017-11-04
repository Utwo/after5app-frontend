import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {StateService} from './state.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private state: StateService, private http: HttpClient, private router: Router) {
  }

  loginEmail(email) {
    const body = JSON.stringify({email: email});
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post(environment.URL_API + 'auth/login', body, {headers: headers})
      .catch(this.handleError);
  }

  authEmail(token) {
    this.http.post(environment.URL_API + 'api/auth/email-authenticate/' + token, '')
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/projects'])
      );
  }

  authFacebook(code) {
    this.http.post(environment.URL_API + 'api/auth/facebook/callback?code=' + code, '')
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/projects'])
      );
  }

  authGitHub(code) {
    this.http.post(environment.URL_API + 'api/auth/github/callback?code=' + code, '')
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
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
