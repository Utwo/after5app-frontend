import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
    @Input() project;
    application = {message: null, position_id: null, answers: []};
    errorMessage;

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
    }

    sendApplication() {
        let select = document.getElementById("selectPosition");
        this.application.position_id = select.value;
        this.projectService.applyForProject(this.application)
            .subscribe(
                data => {
                },
                error => this.errorMessage = <any>error);
    }

}
