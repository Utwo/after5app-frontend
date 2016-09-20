import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {StateService} from "../services/state.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    providers: [ProfileService]
})
export class SettingsComponent implements OnInit {
    private errorMessage;
    private user;

    constructor(private profileService: ProfileService, private state: StateService) {
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
                    user.skill = skills;
                    this.user = user;
                    console.log(this.user);
                },
                error => this.errorMessage = <any>error);
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
