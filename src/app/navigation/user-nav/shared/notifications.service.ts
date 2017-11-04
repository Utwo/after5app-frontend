import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StateService} from '../../../shared/state.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class NotificationsService {

  constructor(private state: StateService, private http: HttpClient) {
  }

  public getNotificationsCount() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION + 'notification/count', {
      headers: headers,
    })
      .catch(this.handleError);
  }

  public getNotifications() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION + 'notification', {
      headers: headers,
    })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

}
