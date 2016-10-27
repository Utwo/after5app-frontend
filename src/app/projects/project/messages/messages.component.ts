import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {StateService} from "../../../shared/state.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  @Input('project_id') project_id;
  @Input('owner_id') owner_id;
  messages = null;
  errorMessage = '';

  constructor(private projectService: ProjectService, private state: StateService) {
  }

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.projectService.getProjectMessages(this.project_id)
      .subscribe(
        res => {
          this.messages = res.messenger.data;
        },
        error => this.errorMessage = <any>error);
  }

  addMessage(message) {
    if (message.value.length === 0) {
      return;
    }
    this.projectService.addMessage(this.project_id, message.value)
      .subscribe(
        messsage => {
          this.getMessages();
        },
        error => this.errorMessage = <any>error);
    message.value = '';
  }

}
