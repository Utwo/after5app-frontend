import {Component, OnInit, Input} from '@angular/core';
import {NotificationsService} from "./shared/notifications.service";
import {LoginService} from "../../core/login.service";
import {Router} from "@angular/router";
import {ResponseHandlerService} from "../../shared/response-handler.service";

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
})
export class UserNavComponent implements OnInit {
  @Input() user;
  isDropdownActiv = false;
  notificationCount = 0;
  notifications = null;
  notificationTypes = {
    comment: 'App\\Notifications\\AddCommentNotification',
    message: 'App\\Notifications\\NewMessageNotification',
    application: 'App\\Notifications\\AddApplicationNotification',
    accept: 'App\\Notifications\\AcceptApplicationNotification',
    decline: 'App\\Notifications\\DeclineApplicationNotification'
  };

  constructor(private notificationsService: NotificationsService, private loginService: LoginService, private router: Router, private responseHandler:ResponseHandlerService) {
  }

  ngOnInit() {
    this.getNotificationCount();
  }

  getNotificationCount() {
    this.notificationsService.getNotificationsCount()
      .subscribe(
        data => this.notificationCount = data.notification_count,
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  getNotifications() {
    this.notificationsService.getNotifications()
      .subscribe(
        data => {
          this.notifications = data.notification;
          this.notificationCount = 0;
        },
        error => this.responseHandler.errorMessage('An error occured!', error));
  }

  dropdown() {
    this.isDropdownActiv = !this.isDropdownActiv;
    if (this.isDropdownActiv && this.notifications === null) {
      this.getNotifications();
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
