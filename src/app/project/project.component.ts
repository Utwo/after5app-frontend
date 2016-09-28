import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
    private project = null;
    private errorMessage: string;
    private sub: Subscription;
    private isFavorite = false;

    constructor(private route: ActivatedRoute, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.getProject(id);
        });
    }

    getProject(id) {
        this.projectService.getProjectById(id)
            .subscribe(
                project => {
                    this.project = project.data[0];
                },
                error => this.errorMessage = <any>error);
    }

    addFavorite() {
        this.projectService.addFavorite(this.project.id)
            .subscribe(
                data => this.isFavorite = true,
                error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        //noinspection TypeScriptUnresolvedFunction
        this.sub.unsubscribe();
    }
}
