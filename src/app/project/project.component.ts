import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../services/project.service";
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

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

    constructor(private route: ActivatedRoute, private projectService: ProjectService) {
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
                    this.project = project.data[0];
                    this.getRelatedProjects();
                },
                error => this.errorMessage = <any>error);
    }

    addFavorite() {
        this.projectService.addFavorite(this.project.id)
            .subscribe(
                data => this.isFavorite = true,
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
                    
                    //shuffle the array
                    this.related = project.data.sort(() => {
                        return 0.5 - Math.random()
                    }).splice(0, 3);
                },
                error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
