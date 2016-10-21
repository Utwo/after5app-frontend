import {Component, OnInit, Output, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {EventEmitter} from "@angular/common/src/facade/async";

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit {
    @Input() project;
    @Output() onApply = new EventEmitter<number>();
    application = {message: null, position_id: null, answers: []};
    errorMessage;

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
    }

    sendApplication(position) {
        this.application.position_id = position;
        this.projectService.applyForProject(this.application)
            .subscribe(
                data => this.onApply.emit(1),
                error => {
                    this.onApply.emit(0);
                    this.errorMessage = <any>error;
                });
    }

}