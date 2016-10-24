import {Component, OnInit, Input} from '@angular/core';
import {ProjectService} from "../../shared/project.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
  @Input() project_id;
  messages = null;
  errorMessage = '';

  constructor(private projectService: ProjectService) {
  }

  ngOnInit() {
    this.getMessages();
  }

  //data":[{"message":{"user_id":1,"user_name":"Mihi","text":"heyyy"},"project_id":"11","created_at":"2016-10-24 14:51:41"},{"message":{"user_id":1,"user_name":"Mihi","text":"hey people"},"project_id":"11","created_at":"2016-10-24 14:50:59"},{"message":{"text":"Officiis vel omnis ea neque veritatis labore.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Aspernatur ex tempore ipsum.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Maiores consequatur et molestias.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Est quis autem enim.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Dolores optio et aliquam ullam reiciendis necessitatibus.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Eum voluptas rerum quas ipsa architecto qui non.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Eum autem eveniet voluptatem voluptas facilis.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Quia in ut non.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"},{"message":{"text":"Enim harum voluptas enim sed dolor ad praesentium.","user_id":"1","user_name":"mihai"},"project_id":"11","created_at":"2016-10-24 04:59:47"}]}}

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
    message.value='';
  }

}
