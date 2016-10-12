import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {StateService} from "../../shared/state.service";
import {ProjectService} from "../shared/project.service";

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
    private project = null;
    private related = [];
    private errorMessage: string;
    private sub: Subscription;
    private myProject = false;
    private isFavorite = false;

    constructor(private route: ActivatedRoute, private projectService: ProjectService, private state: StateService, private router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = +params['id'];
            this.getProject(id);
        });
    }

    getProject(id) {
        this.projectService.getProjectById(id)
            .subscribe(
                project => {
                    if (project.data.length === 0) {
                        this.router.navigate(['/']);
                    }

                    this.project = project.data[0];
                    if (this.state.isLoggedIn()) {
                        if (this.state.getUser().id == this.project.user_id) {
                            this.myProject = true;
                        }
                        for (let user of this.project.favorite) {
                            if (user.id === this.state.getUser().id) {
                                this.isFavorite = true;
                                break;
                            }
                        }
                    }
                    this.getRelatedProjects();
                },
                error => this.errorMessage = <any>error);
    }

    addFavorite() {
        if(this.myProject){
            return;
        }
        this.projectService.addFavorite(this.project.id)
            .subscribe(
                data => {
                    this.isFavorite = !this.isFavorite;
                    if (this.isFavorite) {
                        this.project.favorite_count++;
                    }
                    else {
                        this.project.favorite_count--;
                    }
                },
                error => this.errorMessage = <any>error);
    }

    getRelatedProjects() {
        let skills = [];
        this.project.position.map(item => {
            skills.push(item.skill.id)
        });
        this.projectService.filterBySkill(skills.join(","), this.project.id)
            .subscribe(
                project => {
                    this.related = project.data.sort(() => {
                        return 0.5 - Math.random()
                    }).splice(0, 3);
                },
                error => this.errorMessage = <any>error);
    }

    updateProject() {

    }

    deleteProject() {
        this.projectService.deleteProject(this.project.id)
            .subscribe(
                project => {
                    this.router.navigate(['/']);
                },
                error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
