import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute} from '@angular/router';
import {StateService} from "../services/state.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
    private sub;
    private user = null;
    private errorMessage: string;
    private isMe = false;
    private applications = [];

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private state: StateService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.getUser(id);
            this.verifyIfMe(id);
        });
    }

    getUser(id) {
        this.profileService.getUser(id)
            .subscribe(
                user => {
                    this.user = user;
                },
                error => this.errorMessage = <any>error);
    }

    verifyIfMe(id) {
        if (this.state.getUser().id === id) {
            this.isMe = true
            this.getMyApplications();
        }
    }

    getMyApplications() {
        this.profileService.getMyApplications()
            .subscribe(
                applications => this.applications = applications.data,
                error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
