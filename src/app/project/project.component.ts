import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {StateService} from "../services/state.service";

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
    private project = null;
    private related = [];
    private errorMessage: string;
    private sub: Subscription;
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
                    for (let user of this.project.favorite) {
                        if (user.id === this.state.getUser().id) {
                            this.isFavorite = true;
                            break;
                        }
                    }
                    this.getRelatedProjects();
                },
                error => this.errorMessage = <any>error);
    }

    addFavorite() {
        this.projectService.addFavorite(this.project.id)
            .subscribe(
                data => this.isFavorite = !this.isFavorite,
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
