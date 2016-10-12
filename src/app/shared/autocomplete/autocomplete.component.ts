import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";

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

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.getSkills();
    }

    getSkills() {
        this.projectService.getSkills()
            .subscribe(
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
