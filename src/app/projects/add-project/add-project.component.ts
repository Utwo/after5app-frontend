import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectService} from "../shared/project.service";

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent implements OnInit {
    project = {title: '', descripton: '', application_questions: []};
    positions = [];
    selectedSkill = '';
    errorMessage = '';

    constructor(private projectService: ProjectService, private router: Router) {
    }

    ngOnInit() {
    }

    storeProject() {
        this.projectService.addProject(this.project)
            .subscribe(
                data => {
                    this.storePositions(data.project.id);
                    //this.router.navigate(['/project', data.project.id])
                },
                error => this.errorMessage = <any>error);
    }

    storePositions(project_id) {
        for (let position of this.positions) {
            let pos = {
                description: position.description,
                project_id: project_id,
                position_name: position.skill,
                status: 1
            };
            this.projectService.addPosition(pos)
                .subscribe(
                    data => {
                    },
                    error => this.errorMessage = <any>error);
        }
    }

    onSelect(skill) {
        this.selectedSkill = skill.name;
    }

    addPosition(position) {
        this.positions.push({description: position, skill: this.selectedSkill})
    }

    addQuestion(question) {
        this.project.application_questions.push(question);
    }

    removePosition(index) {
        this.positions.splice(index, 1);
    }

    removeQuestion(index) {
        this.project.application_questions.splice(index, 1);
    }
}
