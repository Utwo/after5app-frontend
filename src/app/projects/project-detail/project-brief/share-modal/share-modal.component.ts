import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild
} from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: "app-share-modal",
  templateUrl: "./share-modal.component.html",
  styles: []
})
export class ShareModalComponent {
  @Output() onShared = new EventEmitter<number>();
  @ViewChild("shareModal", { static: false })
  public shareModal: ModalDirective;
  public environment = environment;
  public href = encodeURIComponent(window.location.href);

  open() {
    this.shareModal.show();
  }

  close() {
    this.shareModal.hide();
  }
}
