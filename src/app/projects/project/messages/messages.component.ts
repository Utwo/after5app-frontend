import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";
import {StateService} from "../../../shared/state.service";
import {ResponseHandlerService} from "../../../shared/response-handler.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  @Input('project_id') project_id;
  @Input('owner_id') owner_id;
  messages = null;

  constructor(private projectService: ProjectService, private state: StateService, private responseHandler: ResponseHandlerService) {
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
        error => this.responseHandler.errorMessage('An error occured!', error));
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
        error => this.responseHandler.errorMessage('An error occured!', error));
    message.value = '';
  }

}
