import { Component, OnInit, Input } from "@angular/core";
import { StateService } from "../../../core/state.service";
import { ResponseHandlerService } from "../../../core/response-handler.service";
import { ProjectService } from "../../shared/project.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-project-header",
  templateUrl: "project-header.component.html"
})
export class ProjectHeaderComponent implements OnInit {
  @Input() project;
  myProject = false;
  user = null;
  isFollowed = false;

  constructor(
    private projectService: ProjectService,
    private state: StateService,
    private router: Router,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    this.user = this.project.user;
    this.loadData();
  }

  loadData() {
    if (this.state.isLoggedIn()) {
      this.verifyIfFavorite();
      this.verifyIfMyProject();
    }
  }

  verifyIfFavorite() {
    for (const user of this.project.favorite) {
      if (user.id === this.state.getUser().id) {
        this.isFollowed = true;
        break;
      }
    }
  }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id === this.project.user_id;
  }

  follow(modal) {
    if (this.state.isLoggedIn()) {
      this.projectService.addFavorite(this.project.id).subscribe(
        () => {
          this.isFollowed = !this.isFollowed;
          if (this.isFollowed) {
            this.project.favorite_count++;
          } else {
            this.project.favorite_count--;
          }
        },
        error => this.responseHandler.errorMessage("An error occured!", error)
      );
    } else {
      modal.open();
    }
  }

  shared(error) {
    if (error) {
      this.responseHandler.errorMessage("An error occured!", error);
    } else {
      this.responseHandler.successMessage("Your project was shared!");
    }
  }

  deleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      () => {
        this.router.navigate(["/projects"]);
        this.responseHandler.successMessage("Your project was deleted!");
      },
      error => this.responseHandler.errorMessage("An error occured!", error)
    );
  }
}
