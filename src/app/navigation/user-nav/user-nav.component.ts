import {Component, OnInit, Input} from '@angular/core';
import {NotificationsService} from "./shared/notifications.service";
import {LoginService} from "../../core/login.service";

@Component({
    selector: 'app-user-nav',
    templateUrl: './user-nav.component.html',
})
export class UserNavComponent implements OnInit {
    @Input() user;
    isDropdownActiv = false;
    notificationCount = 0;
    notifications = null;
    errorMessage = '';
    notificationTypes = {
        comment: 'App\\Notifications\\AddCommentNotification',
        application: 'App\\Notifications\\AddApplicationNotification',
        accept: 'App\\Notifications\\AcceptNotification'
    };

    constructor(private notificationsService: NotificationsService, private loginService: LoginService) {
    }

    ngOnInit() {
        this.getNotificationCount();
    }

    getNotificationCount() {
        this.notificationsService.getNotificationsCount()
            .subscribe(
                data => this.notificationCount = data.notification_count,
                error => this.errorMessage = <any>error);
    }

    getNotifications() {
        this.notificationsService.getNotifications()
            .subscribe(
                data => {
                    this.notifications = data.notification;
                    this.notificationCount = 0;
                },
                error => this.errorMessage = <any>error);
    }

    dropdown() {
        this.isDropdownActiv = !this.isDropdownActiv;
        if (this.isDropdownActiv && this.notifications === null) {
            this.getNotifications();
        }
    }

    logout() {
        this.loginService.logout();
    }
}
