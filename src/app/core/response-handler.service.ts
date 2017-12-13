import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

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
    if (error.status === 401 && error.error && error.error.error === 'Unauthenticated.') {
      this.state.logout();
      this.router.navigate(['/']);
      return;
    }
    this.response = {type: 'error', message: message};
  }
}
