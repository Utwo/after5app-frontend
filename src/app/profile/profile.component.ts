import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
    private sub;
    private user = null;
    private errorMessage:string;

    constructor(private route:ActivatedRoute, private profileService:ProfileService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.getUser(id);
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


    ngOnDestroy() {
        //noinspection TypeScriptUnresolvedFunction
        this.sub.unsubscribe();
    }
}
