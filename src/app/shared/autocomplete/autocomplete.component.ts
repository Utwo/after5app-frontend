import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";
import {Observable} from "rxjs";
import {FormGroup, FormControl} from "@angular/forms";
import {TypeaheadMatch} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
    @Output() onSelect = new EventEmitter<string>();
    skills = null;
    query = '';
    filteredList = [];
    errorMessage = '';
    public skillsCtrl: FormControl = new FormControl();

    public myForm: FormGroup = new FormGroup({
        skill: this.skillsCtrl
    });

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
                skills => this.skills = skills,
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

    ngOnInit() {
        this.getSkills();
    }

    getSkills() {
        this.projectService.getSkills()
            .map(
                skills => this.skills = skills,
                error => this.errorMessage = <any>error);
    }

    filter() {
        this.filteredList = [];
        if (this.query === "") {
            return;
        }
        for (let skill of this.skills) {
            if (skill.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                this.filteredList.push(skill);
            }
        }
    }

    select(skill) {
        this.onSelect.emit(skill);
        this.query = skill.name;
        this.filteredList = [];
    }
}
