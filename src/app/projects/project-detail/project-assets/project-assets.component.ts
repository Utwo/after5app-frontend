import { Component, OnInit, Input } from "@angular/core";
import { StateService } from "../../../core/state.service";
import { ResponseHandlerService } from "../../../core/response-handler.service";
import { ProjectAssetsService } from "./project-assets.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-project-assets",
  templateUrl: "./project-assets.component.html",
  providers: [ProjectAssetsService]
})
export class ProjectAssetsComponent implements OnInit {
  public files = [];
  @Input() project_id;
  public user_token = null;
  public environment = environment;

  constructor(
    private state: StateService,
    private assets: ProjectAssetsService,
    private responseHandler: ResponseHandlerService
  ) {}

  ngOnInit() {
    this.user_token = this.state.getToken();
    this.getAllAssets();
  }

  getAllAssets() {
    this.assets.getAll(this.project_id).subscribe({
      next: (data: any) => (this.files = data),
      error: error =>
        this.responseHandler.errorMessage("An error occured!", error)
    });
  }
}
