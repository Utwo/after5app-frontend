import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-delete-modal",
  templateUrl: "./delete-modal.component.html",
  styles: []
})
export class DeleteModalComponent {
  @Input() project;
  @Output() onDelete = new EventEmitter<any>();
  @ViewChild("deleteModal", { static: false })
  public deleteModal: ModalDirective;

  open() {
    this.deleteModal.show();
  }

  close() {
    this.deleteModal.hide();
  }

  deleteProject() {
    this.onDelete.emit();
    this.deleteModal.hide();
  }
}
