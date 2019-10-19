import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import { StateService } from "../../core/state.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class MessageService {
  constructor(private state: StateService, private http: HttpClient) {}

  public getProjectMessages(project_id, page) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project/" +
          project_id +
          "/messenger?sort[]=created_at,desc&page=" +
          page,
        { headers: headers }
      )
      .pipe(
        map(res => res["messenger"]),
        catchError(this.handleError)
      );
  }

  public addMessage(project_id, message) {
    const body = JSON.stringify({ text: message, project_id: project_id });
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });

    return this.http
      .post(environment.URL_API + environment.API_VERSION + "messenger", body, {
        headers: headers
      })
      .pipe(
        map(res => res["messenger"]),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
