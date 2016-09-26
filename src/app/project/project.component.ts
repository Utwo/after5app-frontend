import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
    private project = null;
    private errorMessage:string;
    //noinspection TypeScriptUnresolvedVariable
    private sub: Subscription;

    constructor(private route:ActivatedRoute, private projectService:ProjectService) {
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

    ngOnDestroy() {
        //noinspection TypeScriptUnresolvedFunction
        this.sub.unsubscribe();
    }
}
