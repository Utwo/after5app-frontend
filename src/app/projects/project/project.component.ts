import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {ProjectService} from "../shared/project.service";
import {StateService} from "../../shared/state.service";
import * as mo from 'mo-js';

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

    @ViewChild('editModal') public editModal: ModalDirective;
    @ViewChild('deleteModal') public deleteModal: ModalDirective;
    @ViewChild('applyModal') public applyModal: ModalDirective;
    @ViewChild("favorite") favorite;
    @ViewChild("favoriteSpan") favoriteSpan;
    //@ViewChild("span") span;

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
        this.showAnimation(this.favorite.nativeElement, this.favoriteSpan.nativeElement);
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

    showAnimation(el, elSpan){
        let timeline = new mojs.Timeline();
        let tweens = [
                // ring animation
                new mo.Shape({
                    parent: el,
                    duration: 750,
                    type: 'circle',
                    radius: {0: 40},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {35:0},
                    opacity: 0.2,
                    top: '45%',
                    easing: mo.easing.bezier(0, 1, 0.5, 1)
                }),
                new mo.Shape({
                    parent: el,
                    duration: 500,
                    delay: 100,
                    type: 'circle',
                    radius: {0: 20},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.2,
                    x : 40,
                    y : -60,
                    easing: mo.easing.sin.out
                }),
                new mo.Shape({
                    parent: el,
                    duration: 500,
                    delay: 180,
                    type: 'circle',
                    radius: {0: 10},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.5,
                    x: -10,
                    y: -80,
                    isRunLess: true,
                    easing: mo.easing.sin.out
                }),
                new mo.Shape({
                    parent: el,
                    duration: 800,
                    delay: 240,
                    type: 'circle',
                    radius: {0: 20},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.3,
                    x: -70,
                    y: -10,
                    easing: mo.easing.sin.out
                }),
                new mo.Shape({
                    parent: el,
                    duration: 800,
                    delay: 240,
                    type: 'circle',
                    radius: {0: 20},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.4,
                    x: 80,
                    y: -50,
                    easing: mo.easing.sin.out
                }),
                new mo.Shape({
                    parent: el,
                    duration: 1000,
                    delay: 300,
                    type: 'circle',
                    radius: {0: 15},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.2,
                    x: 20,
                    y: -100,
                    easing: mo.easing.sin.out
                }),
                new mo.Shape({
                    parent: el,
                    duration: 600,
                    delay: 330,
                    type: 'circle',
                    radius: {0: 25},
                    fill: 'transparent',
                    stroke: '#F35186',
                    strokeWidth: {5:0},
                    opacity: 0.4,
                    x: -40,
                    y: -90,
                    easing: mo.easing.sin.out
                }),
                // icon scale animation
                new mo.Tween({
                    duration : 1200,
                    easing: mo.easing.ease.out,
                    onStart: function(){
                        el.style.overflow = "visible";
                    },
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            let elasticOutProgress = mo.easing.elastic.out(1.43*progress-0.43);
                            elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(0,0,1)';
                        }
                    },
                    onComplete: function(){
                        el.style.overflow = "hidden";
                    }
                })
            ];
            timeline.add(tweens);
            timeline.replay();
            /*onCheck : function() {
                el.style.color = '#F35186';
            }
            onUnCheck : function() {
                el.style.color = '#C0C1C3';
            }*/

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

    sendApplication(code){
        this.applyModal.hide();
        if(code){
            //application was sent
        }
        else{
            this.errorMessage='Application not sent';
        }
    }

    editProject() {
        this.editModal.hide();
    }

    deleteProject() {
        this.projectService.deleteProject(this.project.id)
            .subscribe(
                project => {
                    this.router.navigate(['/']);
                },
                error => this.errorMessage = <any>error);
    }

    public showEditdModal(): void {
        this.editModal.show();
    }

    public showDeleteModal(): void {
        this.deleteModal.show();
    }

    public showApplydModal(): void {
        this.applyModal.show();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
