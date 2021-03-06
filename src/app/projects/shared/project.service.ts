import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { StateService } from "../../core/state.service";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ProjectService {
  options = null;

  constructor(private state: StateService, private http: HttpClient) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.state.getToken()
    });
    this.options = { headers: headers };
  }

  getProjects(page) {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project?sort[]=created_at,desc&with[]=user&with[]=favorite&with[]=position.skill&page=" +
          page
      )
      .pipe(catchError(this.handleError));
  }

  getProjectById(id) {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project?with[]=user&with[]=favorite&with[]=position.skill&with[]=comment&with[]=comment.user&with[]=position.member&id=" +
          id
      )
      .pipe(catchError(this.handleError));
  }

  getPopularProjects() {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project?sort[]=favorite_count,desc&sort[]=created_at,desc&with[]=user&with[]=favorite&with[]=position.skill"
      )
      .pipe(catchError(this.handleError));
  }

  getRecommendedProjects() {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project?recommended&with[]=user&with[]=favorite&with[]=position.skill&user_id=!" +
          this.state.getUser().id,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public searchByName(name) {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project?title=%" +
          name +
          "%&with[]=user&with[]=position.skill"
      )
      .pipe(catchError(this.handleError));
  }

  public filterBySkill(skill, id = null) {
    const project_id = id ? "&id=!" + id : "";
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          `project?position:skill_id=${skill}&with[]=user&with[]=favorite&with[]=position.skill${project_id}`
      )
      .pipe(catchError(this.handleError));
  }

  addProject(project) {
    const body = JSON.stringify(project);
    return this.http
      .post(
        environment.URL_API + environment.API_VERSION + "project",
        body,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  updateProject(project) {
    const body = JSON.stringify(project);
    return this.http
      .put(
        environment.URL_API + environment.API_VERSION + "project/" + project.id,
        body,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  deleteProject(id) {
    return this.http
      .delete(
        environment.URL_API + environment.API_VERSION + "project/" + id,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  addAssets(formData) {
    return this.http
      .post(
        environment.URL_API + environment.API_VERSION + "assets",
        formData,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public getSkills() {
    return this.http
      .get(environment.URL_API + environment.API_VERSION + "skill")
      .pipe(catchError(this.handleError));
  }

  public addComment(comment) {
    const body = JSON.stringify(comment);
    return this.http
      .post(
        environment.URL_API + environment.API_VERSION + "comment",
        body,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public getMembers(project_id) {
    return this.http
      .get(
        environment.URL_API +
          environment.API_VERSION +
          "project/" +
          project_id +
          "/members"
      )
      .pipe(catchError(this.handleError));
  }

  public addFavorite(project_id) {
    return this.http
      .post(
        environment.URL_API +
          environment.API_VERSION +
          "project/" +
          project_id +
          "/favorite",
        "",
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public addPosition(position) {
    const body = JSON.stringify(position);
    return this.http
      .post(
        environment.URL_API + environment.API_VERSION + "position",
        body,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  public deletePosition(position_id) {
    return this.http
      .delete(
        environment.URL_API +
          environment.API_VERSION +
          "position/" +
          position_id,
        this.options
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    return throwError(error);
  }
}
