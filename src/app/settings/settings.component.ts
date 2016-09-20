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
        let user = this.state.getUser();
        this.user = {
            name: user.name,
            email: user.email,
            picture: user.picture || "",
            workplace: user.workplace || "",
            website: user.website || "",
            twitter: user.twitter || "",
            skill: []
        };
    }

    onSubmit() {
        console.log(this.user);
        this.profileService.updateUser(this.user)
            .subscribe(
                data => {
                    this.state.setUser(data.user);
                },
                error => this.errorMessage = <any>error);
    }
}
