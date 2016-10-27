import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Headers} from '@angular/http';
import {environment} from "../../environments/environment";
import {StateService} from "../shared/state.service";
import {Router} from "@angular/router";

@Injectable()
export class LoginService {

  constructor(private state: StateService, private http: Http, private router:Router) {
  }

  login() {
    var headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

    this.http.post(environment.URL_API + 'token/1', '', {headers: headers})
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['jwt-token'], data['user']),
        (error) => this.handleError(error)
      );
  }

  loginEmail(email) {
    let body = JSON.stringify({email: email});
    var headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(environment.URL_API + 'auth/login', body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  authEmail(token) {
    this.http.post(environment.URL_API + 'auth/email-authenticate/' + token, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/'])
      );
  }

  authFacebook(code){
    this.http.post(environment.URL_API + 'auth/facebook/callback?code=' + code, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/'])
      );
  }

  authGitHub(code){
    this.http.post(environment.URL_API + 'auth/github/callback?code=' + code, '')
      .map(res => res.json())
      .subscribe(
        (data) => this.state.storeState(data['token'], data['user']),
        (error) => this.handleError(error),
        () => this.router.navigate(['/'])
      );
  }

  logout() {
    this.state.logout();
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
