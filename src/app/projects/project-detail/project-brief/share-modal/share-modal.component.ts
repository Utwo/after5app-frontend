import {
  Component, OnInit, EventEmitter, Output, Input,
  ViewChild
} from '@angular/core';
import {ProjectService} from "../../../shared/project.service"
import {ModalDirective} from "ng2-bootstrap"
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styles: []
})
export class ShareModalComponent implements OnInit {

  @Input() project;
  @Output() onShared = new EventEmitter<number>();
  @ViewChild('shareModal') public shareModal: ModalDirective;
  public environment = environment;
  public href = encodeURIComponent(window.location.href);


  constructor(private applicationService: ProjectService) {
  }

  ngOnInit() {
  }


  open() {
    this.shareModal.show();
  }

  close() {
    this.shareModal.hide();
  }
}
