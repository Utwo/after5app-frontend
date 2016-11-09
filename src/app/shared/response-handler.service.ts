import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ResponseHandlerService {
  public message: BehaviorSubject<Object> = new BehaviorSubject<Object>(null);

  set response(value) {
    this.message.next(value);
  }

  constructor(private state: StateService, private router: Router) {
  }

  successMessage(message) {
    this.response = {type: 'success', message: message};
  }

  errorMessage(message, error) {
    if (error.status === 401 && JSON.parse(error._body).error === 'token_expired') {
      this.state.logout();
      this.router.navigate(['/']);
      return;
    }
    message = (error === 0) ? message : message + ' (' + error.statusText + ')';

    this.response = {type: 'error', message: message};
  }
}
