import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {StateService} from "../../shared/state.service";

@Injectable()
export class ProjectService {

    constructor(private state: StateService, private http: Http) {
    }

    getProjects(page) {
        return this.http.get(this.state.getUrl() + '/project?with[]=user&with[]=position.skill&page=' + page)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getProjectById(id) {
        return this.http.get(this.state.getUrl() +
            '/project?with[]=user&with[]=favorite&with[]=position.skill&with[]=comment.user&id=' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPopularProjects() {
        return this.http.get(this.state.getUrl() + '/project?sort[]=favorite_count,desc&sort[]=created_at,desc&with[]=user&with[]=position.skill')
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecommendedProjects() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.get(this.state.getUrl() + '/project?recommended&with[]=user&with[]=position.skill', options)
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

        return this.http.post(this.state.getUrl() + '/project', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addPosition(project) {
        let body = JSON.stringify(project);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.state.getUrl() + '/position', body, options)
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

        return this.http.put(this.state.getUrl() + '/project/' + project.id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteProject(id) {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.delete(this.state.getUrl() + '/project/' + id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public searchByName(name) {
        return this.http.get(this.state.getUrl() +
            '/project?title=%' + name + '%&with[]=user&with[]=position.skill')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public filterBySkill(skill, id = null) {
        let project_id = id ? '&id=!' + id : '';
        return this.http.get(this.state.getUrl() +
            `/project?position:skill_id=${skill}&with[]=user&with[]=position.skill${project_id}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getSkills() {
        return this.http.get(this.state.getUrl() + '/skill')
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getProjectComments(id) {
        return this.http.get(this.state.getUrl() +
            '/project?with[]=comment.user&id=' + id)
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

        return this.http.post(this.state.getUrl() + '/comment', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getApplications(project_id) {
        let headers = new Headers({
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        return this.http.get(this.state.getUrl() + '/project/' + project_id + '/application?with[]=user&with[]=position.skill', {headers: headers})
            .map(this.extractData)
            .catch(this.handleError);
    }

    applyForProject(application) {
        let body = JSON.stringify(application);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.state.getUrl() + '/application', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public acceptApplication(application_id) {
        let body = JSON.stringify({accepted: 1});
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.state.getUrl() + '/application/' + application_id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public addFavorite(project_id) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.state.getUrl() + '/project/' + project_id + '/favorite', "", options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public deletePosition(position_id) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.getToken()
        });
        let options = new RequestOptions({headers: headers});

        return this.http.delete(this.state.getUrl() + '/position/' + position_id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}