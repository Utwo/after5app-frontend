import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap';
import {ProjectService} from '../shared/project.service';
import {StateService} from '../../core/state.service';
import {ResponseHandlerService} from '../../core/response-handler.service';
import {environment} from '../../../environments/environment';
import {ApplicationService} from '../shared/application.service';
const mo = require('mo-js/build/mo.min.js');

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  public project = null;
  public project_id = null;
  public applications = null;
  public related = null;
  public members = null;
  public myProject = false;
  public isFavorite = false;
  public isMember = false;
  public environment = environment;
  public href = encodeURIComponent(window.location.href);

  @ViewChild('editModal') public editModal: ModalDirective;
  @ViewChild('deleteModal') public deleteModal: ModalDirective;
  @ViewChild('applyModal') public applyModal: ModalDirective;
  @ViewChild('favorite') favorite;
  @ViewChild('favoriteSpan') favoriteSpan;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private applicationService: ApplicationService,
              private state: StateService,
              private router: Router,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        if (this.project_id !== id) {
          this.myProject = false;
          this.isMember = false;
          this.project_id = id;
          this.getProject();
        }
      });
  }

  getProject() {
    this.projectService.getProjectById(this.project_id)
      .subscribe(
        project => {
          if (project.data.length === 0) {
            this.router.navigate(['/not-found']);
            return;
          }
          this.project = project.data[0];

          if (this.state.isLoggedIn()) {
            this.verifyIfMyProject();
            this.verifyIfFavorite();
          }
          this.getRelatedProjects();
          this.getMembers();
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  verifyIfMyProject() {
    if (this.state.getUser().id === this.project.user_id) {
      this.myProject = true;
      this.getApplications();
    } else {
      this.myProject = false;
    }
  }

  verifyIfFavorite() {
    for (const user of this.project.favorite) {
      if (user.id === this.state.getUser().id) {
        this.isFavorite = true;
        break;
      }
    }
  }

  addFavorite() {
    this.projectService.addFavorite(this.project.id)
      .subscribe(
        () => {
          this.isFavorite = !this.isFavorite;
          if (this.isFavorite) {
            this.project.favorite_count++;
            this.showAnimation(this.favorite.nativeElement, this.favoriteSpan.nativeElement);
          } else {
            this.project.favorite_count--;
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getRelatedProjects() {
    const skills = [];
    this.project.position.map(item => {
      skills.push(item.skill.id);
    });
    this.projectService.filterBySkill(skills.join(','), this.project.id)
      .subscribe(
        project => {
          this.related = project.data.sort(() => {
            return 0.5 - Math.random();
          }).splice(0, 3);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getMembers() {
    this.projectService.getMembers(this.project.id)
      .subscribe(
        members => {
          this.members = members;
          if (this.state.isLoggedIn()) {
            for (const member of members) {
              if (member.id === this.state.getUser().id) {
                this.isMember = true;
              }
            }
          }
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  removeMember(index) {
    let application_id;
    const member = this.members[index];
    for (const application of this.applications) {
      if (application.user_id === member.id) {
        application_id = application.id;
      }
    }
    this.applicationService.declineApplication(application_id)
      .subscribe(
        data => this.getMembers(),
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getApplications() {
    if (!this.myProject) {
      return;
    }
    this.applicationService.getApplications(this.project.id)
      .subscribe(
        data => {
          this.applications = data;
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  applicationSent(error) {
    this.applyModal.hide();
    if (error) {
      this.responseHandler.errorMessage('An error occured!', error);
    } else {
      this.responseHandler.successMessage('Your application was sent!');
    }
  }

  pendingApplicationsCount() {
    return this.applications.filter((item) => item.accepted === false).length;
  }

  applicationResponse(application_id) {
    this.applications = this.applications.filter((item) => item.id !== application_id);
    this.getMembers();
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id)
      .subscribe(
        () => {
          this.router.navigate(['/projects']);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  editProject() {
    this.editModal.hide();
    this.getProject();
    this.responseHandler.successMessage('Changes were saved');
  }

  showAnimation(el, elSpan) {
    const timeline = new mo.Timeline();
    const tweens = [
      // ring animation
      new mo.Shape({
        parent: el,
        duration: 750,
        type: 'circle',
        radius: {0: 40},
        fill: 'transparent',
        stroke: '#F35186',
        strokeWidth: {35: 0},
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
        strokeWidth: {5: 0},
        opacity: 0.2,
        x: 40,
        y: -60,
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
        strokeWidth: {5: 0},
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
        strokeWidth: {5: 0},
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
        strokeWidth: {5: 0},
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
        strokeWidth: {5: 0},
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
        strokeWidth: {5: 0},
        opacity: 0.4,
        x: -40,
        y: -90,
        easing: mo.easing.sin.out
      }),
      // icon scale animation
      new mo.Tween({
        duration: 1200,
        easing: mo.easing.ease.out,
        onStart: function () {
          el.style.overflow = 'visible';
        },
        onUpdate: function (progress) {
          if (progress > 0.3) {
            const elasticOutProgress = mo.easing.elastic.out(1.43 * progress - 0.43);
            elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
          } else {
            elSpan.style.WebkitTransform = elSpan.style.transform = 'scale3d(0,0,1)';
          }
        },
        onComplete: function () {
          el.style.overflow = 'hidden';
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

}
