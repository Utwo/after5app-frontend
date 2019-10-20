import { Component, OnInit, Input } from "@angular/core";
import { StateService } from "../../../../core/state.service";
import { ResponseHandlerService } from "../../../../core/response-handler.service";

@Component({
  selector: "app-position-card",
  templateUrl: "./position-card.component.html"
})
export class PositionCardComponent implements OnInit {
  @Input() position;
  @Input() project;
  @Input() myApplications;

  myProject = false;
  iAppied = false;
  member = null;
  hasMember = false;
  showDetails = false;

  constructor(
    private state: StateService,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    if (this.position.member.length > 0) {
      this.hasMember = true;
      this.member = this.position.member[0];
    }
    if (this.state.isLoggedIn()) {
      this.verifyIfMyProject();
      this.verifyIfApplied();
    }
  }

  verifyIfMyProject() {
    this.myProject = this.state.getUser().id === this.project.user_id;
  }

  verifyIfApplied() {}

  applicationSent(error) {
    if (error) {
      this.responseHandler.errorMessage("An error occured!", error);
    } else {
      this.responseHandler.successMessage("Your application was sent!");
    }
  }

  out() {
    this.showDetails = false;
  }
}
