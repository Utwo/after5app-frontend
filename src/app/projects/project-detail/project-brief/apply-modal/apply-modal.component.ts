import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter
} from "@angular/core";
import { ApplicationService } from "../../../shared/application.service";
import { ModalDirective } from "ngx-bootstrap";
import { StateService } from "../../../../core/state.service";

@Component({
  selector: "app-apply-modal",
  templateUrl: "./apply-modal.component.html",
  styles: []
})
export class ApplyModalComponent {
  @Input() project;
  @Input() position;
  @Output() onApply = new EventEmitter<number>();
  application = { message: "", position_id: null, answers: [] };
  @ViewChild("applyModal", { static: false })
  public applyModal: ModalDirective;
  public error = "";

  constructor(
    private applicationService: ApplicationService,
    private state: StateService
  ) {}

  sendApplication(modal) {
    if (!this.state.isLoggedIn()) {
      modal.open();
      return;
    }
    if (!this.application.message) {
      this.error = "Please fill out the reason you want to join";
      return;
    }
    this.application.position_id = this.position.id;
    this.applicationService.applyForProject(this.application).subscribe(
      () => {
        this.application = { message: "", position_id: null, answers: [] };
        this.error = "";
        this.onApply.emit(0);
      },
      error => {
        this.onApply.emit(error);
      }
    );
    this.close();
  }

  open() {
    this.applyModal.show();
  }

  close() {
    this.applyModal.hide();
  }
}
