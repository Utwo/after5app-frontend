import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html'
})

export class NotificationComponent {
  @Input() notification;
  notificationTypes = {
    comment: 'App\\Notifications\\AddCommentNotification',
    message: 'App\\Notifications\\NewMessageNotification',
    application: 'App\\Notifications\\AddApplicationNotification',
    accept: 'App\\Notifications\\AcceptApplicationNotification',
    decline: 'App\\Notifications\\DeclineApplicationNotification'
  };
}
