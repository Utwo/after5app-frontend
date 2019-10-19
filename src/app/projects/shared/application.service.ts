import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { StateService } from "../../core/state.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApplicationService {
  constructor(private state: StateService, private http: HttpClient) {}

  public getApplications(project_id) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.state.getToken()
    });
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project/" +
          project_id +
          "/application?with[]=user&with[]=position.skill",
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  applyForProject(application) {
    const body = JSON.stringify(application);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .post(
        environment.URL_API + environment.API_VERSION + "application",
        body,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  public acceptApplication(application_id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .put(
        environment.URL_API +
          environment.API_VERSION +
          "application/" +
          application_id,
        {},
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  public declineApplication(application_id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .delete(
        environment.URL_API +
          environment.API_VERSION +
          "application/" +
          application_id,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  public getMyApplications(project_id) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.state.getToken()
    });
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "application/user?project_id=" +
          project_id,
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
