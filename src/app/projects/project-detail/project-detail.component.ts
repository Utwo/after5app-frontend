import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../shared/project.service";
import { StateService } from "../../core/state.service";
import { ResponseHandlerService } from "../../core/response-handler.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-project-detail",
  templateUrl: "./project-detail.component.html"
})
export class ProjectDetailComponent implements OnInit {
  @Input() id;
  public project = null;
  private myProject = false;
  private isMember = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private state: StateService,
    private router: Router,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => params["id"])).subscribe(id => {
      this.id = id;
      this.getProject();
    });
  }

  getProject() {
    this.projectService.getProjectById(this.id).subscribe({
      next: (project: any) => {
        if (project.data.length === 0) {
          this.router.navigate(["/not-found"]);
          return;
        }
        this.project = project.data[0];
        if (this.state.isLoggedIn()) {
          this.verifyIfMyProject();
          this.verifyIfMember();
        }
      },
      error: error =>
        this.responseHandler.errorMessage("An error occured!", error)
    });
  }

  verifyIfMember() {
    this.project.position.map(position => {
      position.member.map(member => {
        if (member.id === this.state.getUser().id) {
          this.isMember = true;
        }
      });
    });
  }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id === this.project.user_id;
  }
}
