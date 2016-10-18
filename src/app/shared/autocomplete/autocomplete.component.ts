import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";
import {Input} from "@angular/core/src/metadata/directives";
import {Observable} from "rxjs";
import {FormGroup, FormControl} from "@angular/forms";
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
    @Input() type;
    @Output() onSelect = new EventEmitter<string>();
    skills = null;
    query = '';
    filteredList = [];
export class AutocompleteComponent {
    errorMessage = '';
    public dataSource: Observable<any>;
    public asyncSelected: string = '';
    public typeaheadLoading: boolean = false;
    public typeaheadNoResults: boolean = false;

    constructor(private projectService: ProjectService) {
        this.dataSource = Observable.create((observer: any) => {
            // Runs on every search
            observer.next(this.asyncSelected);
        }).mergeMap((token: string) => this.getSkillsAsObservable(token));
    }

    public getSkillsAsObservable(token: string): Observable<any> {
        return this.projectService.getSkills()
            .map(
                skills => {
                    return skills.filter(item => {
                        return item.name.toLowerCase().indexOf(token.toLowerCase()) > -1
                    });
                },
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
