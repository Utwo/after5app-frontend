import {Component} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';
import {Observable} from "rxjs";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    errorMessage: string;
    public dataSource: Observable<any>;
    public asyncSelected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;

    public constructor(private projectService: ProjectService) {
        this.dataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.asyncSelected);
        }).mergeMap((token: string) => this.getProjectsAsObservable(token));
    }

    public getProjectsAsObservable(token: string): Observable<any> {
        return this.projectService.searchByName(token)
            .map(
                projects => projects.data,
                error => this.errorMessage = <any>error)
    }

    public changeTypeaheadLoading(e: boolean): void {
        this.typeaheadLoading = e;
    }

    public changeTypeaheadNoResults(e: boolean): void {
        this.typeaheadNoResults = e;
    }

    public typeaheadOnSelect(e: TypeaheadMatch): void {
        console.log('Selected value: ', e.value);
    }

}
