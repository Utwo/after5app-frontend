import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../projects/shared/project.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    errorMessage: string;
    projects = null;

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
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
