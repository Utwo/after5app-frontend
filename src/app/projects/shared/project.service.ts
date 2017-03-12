import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProjectService {
  options = null;

  constructor(private state: StateService, private http: Http) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    this.options = new RequestOptions({headers: headers});
  }

  getProjects(page) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=created_at,desc&with[]=user&with[]=favorite&with[]=position.skill&page=' + page)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProjectById(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?with[]=user&with[]=favorite&with[]=position.skill&with[]=comment&with[]=comment.user&with[]=position.member&id=' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPopularProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=favorite_count,desc&sort[]=created_at,desc&with[]=user&with[]=favorite&with[]=position.skill')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRecommendedProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?recommended&with[]=user&with[]=favorite&with[]=position.skill&user_id=!' + this.state.getUser().id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public searchByName(name) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?title=%' + name + '%&with[]=user&with[]=position.skill')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public filterBySkill(skill, id = null) {
    let project_id = id ? '&id=!' + id : '';
    const user_id = this.state.isLoggedIn() ? this.state.getUser().id : '';
    return this.http.get(environment.URL_API + environment.API_VERSION +
      `project?position:skill_id=${skill}&user_id=!${user_id}&with[]=user&with[]=position.skill${project_id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addProject(project) {
    let body = JSON.stringify(project);
    return this.http.post(environment.URL_API + environment.API_VERSION + 'project', body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateProject(project) {
    let body = JSON.stringify(project);
    return this.http.put(environment.URL_API + environment.API_VERSION + 'project/' + project.id, body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteProject(id) {
    return this.http.delete(environment.URL_API + environment.API_VERSION + 'project/' + id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getSkills() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'skill')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addComment(comment) {
    let body = JSON.stringify(comment);
    return this.http.post(environment.URL_API + environment.API_VERSION + 'comment', body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMembers(project_id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project/' + project_id + '/members')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addFavorite(project_id) {
    return this.http.post(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/favorite', '', this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addPosition(position) {
    let body = JSON.stringify(position);
    return this.http.post(environment.URL_API + environment.API_VERSION + 'position', body, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deletePosition(position_id) {
    return this.http.delete(environment.URL_API + environment.API_VERSION + 'position/' + position_id, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
