import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProjectService {

  constructor(private state: StateService, private http: Http) {
  }

  getProjects(page) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=created_at,desc&with[]=user&with[]=favorite&with[]=position.skill&page=' + page)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getProjectById(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?with[]=user&with[]=favorite&with[]=position.skill&with[]=comment.user&id=' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPopularProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=favorite_count,desc&sort[]=created_at,desc&with[]=user&with[]=position.skill')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRecommendedProjects() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?recommended&with[]=user&with[]=position.skill&user_id=!' + this.state.getUser().id, options)
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
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION + 'project', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateProject(project) {
    let body = JSON.stringify(project);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.put(environment.URL_API + environment.API_VERSION + 'project/' + project.id, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteProject(id) {
    let headers = new Headers({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.delete(environment.URL_API + environment.API_VERSION + 'project/' + id, options)
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
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION + 'comment', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getMembers(project_id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project/' + project_id + '/members')
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addFavorite(project_id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/favorite', '', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public addPosition(position) {
    let body = JSON.stringify(position);

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    const options = new RequestOptions({headers: headers});

    return this.http.post(environment.URL_API + environment.API_VERSION + 'position', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deletePosition(position_id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    let options = new RequestOptions({headers: headers});

    return this.http.delete(environment.URL_API + environment.API_VERSION + 'position/' + position_id, options)
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
