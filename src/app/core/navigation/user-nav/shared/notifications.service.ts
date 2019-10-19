import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { StateService } from "../../../state.service";
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class NotificationsService {
  constructor(private state: StateService, private http: HttpClient) {}

  public getNotificationsCount() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .get(
        environment.URL_API + environment.API_VERSION + "notification/count",
        {
          headers: headers
        }
      )
      .pipe(catchError(this.handleError));
  }

  public getNotifications() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .get(environment.URL_API + environment.API_VERSION + "notification", {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
