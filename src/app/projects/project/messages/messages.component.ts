import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from '../../shared/project.service';
import {ResponseHandlerService} from '../../../shared/response-handler.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  @Input('project_id') project_id;
  @Input('owner_id') owner_id;
  messages = null;
  page = {current_page: null, prev: null, next: null};

  constructor(private projectService: ProjectService,
              private responseHandler: ResponseHandlerService) {
  }

  ngOnInit() {
    this.getMessages(1);
  }

  getMessages(page) {
    this.projectService.getProjectMessages(this.project_id, page)
      .subscribe(
        data => {
          if (this.messages === null) {
            this.messages = [];
          }
          this.pushMessages(data);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  pushMessages(data) {
    this.messages.unshift.apply(this.messages, data.data.reverse());
    this.page = {
      current_page: data.current_page,
      next: data.next_page_url,
      prev: data.prev_page_url
    };
  }

  addMessage(message) {
    if (message.value.length === 0) {
      return;
    }
    this.projectService.addMessage(this.project_id, message.value)
      .subscribe(
        new_message => {
          this.messages.push(new_message);
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
    message.value = '';
  }

  loadMore() {
    this.getMessages(this.page.current_page + 1);
  }
}
