import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent implements OnInit {
    project = {title: '', descripton: '', questions: []};
    positions = [];
    skills = null;
    selectedSkill = '';
    errorMessage = '';

    constructor(private projectService: ProjectService, private router: Router) {
    }

    ngOnInit() {
        this.getSkills();
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
        this.project.questions.push(question);
    }

    removePosition(index) {
        this.positions.splice(index, 1);
    }

    removeQuestion(index) {
        this.project.questions.splice(index, 1);
    }

    getSkills() {
        this.projectService.getSkills()
            .subscribe(
                skills => this.skills = skills,
                error => this.errorMessage = <any>error);
    }
}
