import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NotificationsService} from './shared/notifications.service';
import {LoginService} from '../../core/login.service';
import {Router} from '@angular/router';
import {ResponseHandlerService} from '../../shared/response-handler.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
})
export class UserNavComponent implements OnInit {
  @Input() user;
  @ViewChild('container') container;

  isDropdownUserActiv = false;
  isDropdownNotifActiv = false;
  notificationCount = 0;
  notifications = null;

  constructor(private notificationsService: NotificationsService, private loginService: LoginService,
              private router: Router, private responseHandler: ResponseHandlerService) {
    document.addEventListener('click', this.onClickOutside.bind(this));
  }

  ngOnInit() {
    this.getNotificationCount();
  }

  onClickOutside(event) {
    if (!this.container.nativeElement.contains(event.target)) {
      this.isDropdownUserActiv = false;
      this.isDropdownNotifActiv = false;
    }
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

  dropdownUser() {
    this.isDropdownUserActiv = !this.isDropdownUserActiv;
    this.isDropdownNotifActiv = false;
  }

  dropdownNotification() {
    this.isDropdownUserActiv = false;
    this.isDropdownNotifActiv = !this.isDropdownNotifActiv;
    if (this.isDropdownNotifActiv && this.notifications === null) {
      this.getNotifications();
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
