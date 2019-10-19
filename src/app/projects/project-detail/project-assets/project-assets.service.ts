import { Injectable } from "@angular/core";
import { StateService } from "../../../core/state.service";
import { environment } from "../../../../environments/environment";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ProjectAssetsService {
  constructor(private state: StateService, private http: HttpClient) {}

  addAsset(info) {
    const body = JSON.stringify(info);

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .post(environment.URL_API + environment.API_VERSION + "assets", body, {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  downloadAllAsset(info) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .get(environment.URL_API + environment.API_VERSION + "assets", {
        headers: headers
      })
      .pipe(catchError(this.handleError));
  }

  getAll(project_id) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project/" +
          project_id +
          "/assets?with=user",
        { headers: headers }
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
