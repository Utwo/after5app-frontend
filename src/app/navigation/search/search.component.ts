import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";
import {FormControl, FormGroup} from '@angular/forms';
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';
import {Observable} from "rxjs";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    errorMessage: string;
    projects:Array<any> = null;
    public projectsCtrl: FormControl = new FormControl();

    public myForm: FormGroup = new FormGroup({
        project: this.projectsCtrl
    });

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

    searchByName(name) {
        if (name.length === 0) {
            this.projects = null;
            return;
        }
        this.projectService.searchByName(name)
            .subscribe(
                projects => this.projects = projects.data,
                error => this.errorMessage = <any>error);
    }

    removeQuery(search) {
        search.value = '';
        this.projects = null;
    }
}
