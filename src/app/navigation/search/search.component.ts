import {Component} from '@angular/core';
import {ProjectService} from '../../projects/shared/project.service';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {Router} from '@angular/router';
import {ResponseHandlerService} from '../../shared/response-handler.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  public dataSource: Observable<any>;
  public asyncSelected = '';
  public typeaheadLoading = false;
  public typeaheadNoResults = false;

  public constructor(private projectService: ProjectService, private router: Router, private responseHandler: ResponseHandlerService) {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).mergeMap((token: string) => this.getProjectsAsObservable(token));
  }

  public getProjectsAsObservable(token: string): Observable<any> {
    return this.projectService.searchByName(token)
      .map(
        projects => projects.data,
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncSelected = e.item.title;
    this.router.navigate(['/project/', e.item.id]);
  }

}
