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
        console.dir(this.favorite.nativeElement);
        let scaleCurve = mo.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
        var el = this.favorite.nativeElement,
            //elSpan = this.span.nativeElement,
            // mo.js timeline obj
            timeline = new mo.Timeline(),

            // tweens for the animation:

            // burst animation
            tween1 = new mo.Burst({
                parent: el,
                duration: 1500,
                shape : 'circle',
                fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                opacity: 0.6,
                childOptions: { radius: {20:0} },
                radius: {40:120},
                count: 6,
                isSwirl: true,
                easing: mo.easing.bezier(0.1, 1, 0.3, 1)
            }),
            // ring animation
            tween2 = new mo.Transit({
                parent: el,
                duration: 750,
                type: 'circle',
                radius: {0: 50},
                fill: 'transparent',
                stroke: '#988ADE',
                strokeWidth: {15:0},
                opacity: 0.6,
                easing: mo.easing.bezier(0, 1, 0.5, 1)
            }),
            // icon scale animation
            tween3 = new mo.Tween({
                duration : 900,
                onUpdate: function(progress) {
                    let scaleProgress = scaleCurve(progress);
                    //elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
                }
            });

        // add tweens to timeline:
        timeline.add(tween1, tween2, tween3);

        timeline.replay();


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
