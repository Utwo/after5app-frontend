import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {StateService} from "../services/state.service";
import {ProjectService} from "../services/project.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
    private errorMessage;
    private user;
    private skills;

    constructor(private profileService: ProfileService, private state: StateService, private projectService: ProjectService) {
    }

    ngOnInit() {
        this.getUser();
        this.getSkills();
    }

    getUser() {
        this.profileService.getLoggedInUser()
            .subscribe(
                user => {
                    let skills = [];
                    for (let skill of user.skill) {
                        skills.push(skill.name);
                    }
                    this.user = user;
                    this.user.skill = skills;
                },
                error => this.errorMessage = <any>error);
    }

    getSkills() {
        this.projectService.getSkills()
            .subscribe(
                skills => this.skills = skills,
                error => this.errorMessage = <any>error);
    }

    onSelect(skill) {
        this.addSkill(skill.name);
    }

    addSkill(skill) {
        this.user.skill.push(skill);
    }

    removeSkill(index) {
        this.user.skill.splice(index, 1);
    }

    onSubmit() {
        this.profileService.updateUser(this.user)
            .subscribe(
                data => {
                    this.state.setUser(data.user);
                },
                error => this.errorMessage = <any>error);
    }
}
