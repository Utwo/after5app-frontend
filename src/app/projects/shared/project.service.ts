import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StateService} from '../../shared/state.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class ProjectService {

  constructor(private state: StateService, private http: HttpClient) {
  }

  getProjects(page) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=created_at,desc&with[]=user&with[]=position.skill&page=' + page).catch(this.handleError);
  }

  getProjectById(id) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?with[]=user&with[]=favorite&with[]=position.skill&with[]=comment.user&id=' + id).catch(this.handleError);
  }

  getPopularProjects() {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?sort[]=favorite_count,desc&sort[]=created_at,desc&with[]=user&with[]=position.skill').catch(this.handleError);
  }

  getRecommendedProjects() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?recommended&with[]=user&with[]=position.skill&user_id=!' + this.state.getUser().id, {
      headers: headers,
    }).catch(this.handleError);
  }

  addProject(project) {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION + 'project', body, {
      headers: headers,
    }).catch(this.handleError);
  }

  updateProject(project) {
    const body = JSON.stringify(project);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.put(environment.URL_API + environment.API_VERSION + 'project/' + project.id, body, {
      headers: headers,
    }).catch(this.handleError);
  }

  deleteProject(id) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.delete(environment.URL_API + environment.API_VERSION + 'project/' + id, {
      headers: headers,
    }).catch(this.handleError);
  }

  public searchByName(name) {
    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project?title=%' + name + '%&with[]=user&with[]=position.skill')
      .catch(this.handleError);
  }

  public filterBySkill(skill, id = null) {
    const project_id = id ? '&id=!' + id : '';
    const user_id = this.state.isLoggedIn() ? this.state.getUser().id : '';
    return this.http.get(environment.URL_API + environment.API_VERSION +
      `project?position:skill_id=${skill}&user_id=!${user_id}&with[]=user&with[]=position.skill${project_id}`)
      .catch(this.handleError);
  }

  public getSkills() {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'skill').catch(this.handleError);
  }

  public getProjectMessages(project_id, page) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.get(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/messenger?sort[]=created_at,desc&page=' + page, {
      headers: headers,
    })
      .map(res => res['messenger'])
      .catch(this.handleError);
  }

  public addMessage(project_id, message) {
    const body = JSON.stringify({text: message, project_id: project_id});
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION + 'messenger', body, {
      headers: headers,
    })
      .map(res => res['messenger'])
      .catch(this.handleError);
  }

  public addComment(comment) {
    const body = JSON.stringify(comment);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION + 'comment', body, {
      headers: headers,
    }).catch(this.handleError);
  }

  public getApplications(project_id) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.state.getToken()
    });
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project/' + project_id +
      '/application?with[]=user&with[]=position.skill', {headers: headers}).catch(this.handleError);
  }

  public getMembers(project_id) {
    return this.http.get(environment.URL_API + environment.API_VERSION + 'project/' + project_id + '/members').catch(this.handleError);
  }

  applyForProject(application) {
    const body = JSON.stringify(application);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION + 'application', body, {
      headers: headers,
    }).catch(this.handleError);
  }

  public acceptApplication(application_id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.put(environment.URL_API + environment.API_VERSION +
      'application/' + application_id, {}, {
      headers: headers,
    }).catch(this.handleError);
  }

  public declineApplication(application_id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.delete(environment.URL_API + environment.API_VERSION +
      'application/' + application_id, {
      headers: headers,
    }).catch(this.handleError);
  }

  public addFavorite(project_id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION +
      'project/' + project_id + '/favorite', '', {
      headers: headers,
    }).catch(this.handleError);
  }

  public addPosition(position) {
    const body = JSON.stringify(position);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.post(environment.URL_API + environment.API_VERSION + 'position', body, {
      headers: headers,
    }).catch(this.handleError);
  }

  public deletePosition(position_id) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.state.getToken()
    });

    return this.http.delete(environment.URL_API + environment.API_VERSION + 'position/' + position_id, {
      headers: headers,
    }).catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
