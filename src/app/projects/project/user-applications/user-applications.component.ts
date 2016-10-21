import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";

@Component({
    selector: 'app-user-applications',
    templateUrl: './user-applications.component.html'
})
export class UserApplicationsComponent implements OnInit {
    @Input() project_id;
    applications = null;
    errorMessage = '';

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        //this.getApplications();
    }

    getApplications() {
        this.projectService.getApplications()
            .subscribe(
                data => {
                    this.applications = data;
                },
                error => this.errorMessage = <any>error);
    }

    acceptApplication(application_id) {
        this.projectService.acceptApplication(application_id)
            .subscribe(
                data => {
                    this.getApplications();
                },
                error => this.errorMessage = <any>error);
    }
}
