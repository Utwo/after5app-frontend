import {Component, OnInit} from '@angular/core';
import {StateService} from "../../shared/state.service";
import {ProfileService} from "../shared/profile.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
    private errorMessage;
    private user;

    constructor(private state: StateService, private profileService: ProfileService) {
    }

    ngOnInit() {
        this.getUser();
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
