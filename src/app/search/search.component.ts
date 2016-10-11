import {Component, OnInit, Input, Output} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    errorMessage: string;
    projects = null;

    constructor(private projectService: ProjectService, private router: Router) {
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
