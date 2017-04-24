import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { StateService } from '../../../state.service';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class NotificationsService {

  constructor(private state: StateService, private http: Http) {
  }

  public getNotificationsCount() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'notification/count', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getNotifications() {
    const headers = new Headers({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION + 'notification', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

}
