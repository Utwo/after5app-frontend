import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ResponseHandlerService } from "../core/response-handler.service";
import { ProjectService } from "../projects/shared/project.service";
import { StateService } from "../core/state.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-edit-project",
  templateUrl: "./edit-project.component.html"
})
export class EditProjectComponent {
  public project;
  assets = [];
  steps = ["title", "description", "skills", "assets", "questions", "overview"];
  activeStep = "title";
  infoMessage = {
    title: "Hit ENTER once you finish typing to go to the next step",
    description:
      "You can always go back and edit your answer by clicking on the previous step",
    skills: "Open some position slots so that other people can join your team",
    assets: "Add files that help you present your idea",
    questions:
      "Add question so that your future team better understands your needs"
  };

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private state: StateService,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    this.route.params.pipe(map(params => params["id"])).subscribe(id => {
      this.getProject(id);
    });
  }

  getProject(id) {
    this.projectService.getProjectById(id).subscribe({
      next: (project: any) => {
        if (project.data.length === 0) {
          this.router.navigate(["/not-found"]);
          return;
        }
        this.project = project.data[0];
        if (!this.verifyIfMyProject()) {
          this.router.navigate(["/not-found"]);
        }
        this.formatProject();
      },
      error: error =>
        this.responseHandler.errorMessage("An error occured!", error)
    });
  }

  formatProject() {
    this.project.position = this.project.position.map(pos => ({
      description: pos.description,
      name: pos.skill.name,
      status: pos.status
    }));
    console.log(this.project);
  }

  verifyIfMyProject() {
    return this.state.getUser().id === this.project.user_id;
  }

  onNext(data) {
    this.project[this.activeStep] = data;
    this.nextStep();
  }

  nextStep() {
    const currentIndex = this.steps.indexOf(this.activeStep);
    if (currentIndex + 1 === this.steps.length) {
      this.updateProject();
    } else {
      this.activeStep = this.steps[currentIndex + 1];
    }
  }

  changeStep(step) {
    const currentIndex = this.steps.indexOf(this.activeStep);
    const nextIndex = this.steps.indexOf(step);
    if (nextIndex < currentIndex) {
      this.activeStep = step;
    } else {
      if (canGoToNextStep(step, this.project)) {
        this.activeStep = step;
      }
    }
  }

  goToStep(step) {
    this.activeStep = step;
  }

  isStepEnabled(step, steps, project) {
    const currentIndex = steps.indexOf(this.activeStep);
    const stepIndex = steps.indexOf(step);
    if (stepIndex === currentIndex) {
      return false;
    }
    if (stepIndex < currentIndex) {
      return true;
    } else {
      if (canGoToNextStep(step, project)) {
        return true;
      }
    }
    return false;
  }

  updateProject() {
    this.projectService.updateProject(this.project).subscribe({
      next: (data: any) => this.storeAssets(data.project.id),
      error: error =>
        this.responseHandler.errorMessage(
          "An error occured when saing the project!",
          error
        )
    });
  }

  storeAssets(projectId) {
    if (this.assets.length) {
      const formData: FormData = new FormData();
      for (const file of this.assets) {
        formData.append("assets", file, file.name);
      }
      formData.append("project_id", projectId);
      this.projectService
        .addAssets(formData)
        .subscribe(
          () => this.router.navigate(["/project", projectId]),
          error =>
            this.responseHandler.errorMessage(
              "An error occured when saving the files!",
              error
            )
        );
    } else {
      this.router.navigate(["/project", projectId]);
    }
  }
}

function canGoToNextStep(step, project) {
  const title = step === "title";
  const description = step === "description" && project.title;
  const skills = step === "skills" && project.title && project.description;
  const others =
    (step === "assets" || step === "questions" || step === "overview") &&
    project.position.length > 0 &&
    project.title &&
    project.description;
  return title || description || skills || others;
}
