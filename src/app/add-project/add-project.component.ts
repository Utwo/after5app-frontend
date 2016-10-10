import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.component.html',
})
export class AddProjectComponent implements OnInit {
    project = {title: '', descripton: '', positions: [], questions: []};
    skills = null;
    selectedSkill = '';
    errorMessage = '';

    constructor(private projectService: ProjectService) {
    }

    ngOnInit() {
        this.getSkills();
    }

    onSelect(skill) {
        this.selectedSkill = skill.name;
    }

    addPosition(position) {
        this.project.positions.push({description: position, skill: this.selectedSkill})
    }

    addQuestion(question) {
        this.project.questions.push(question);
    }

    removePosition(index) {
        this.project.positions.splice(index, 1);
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
