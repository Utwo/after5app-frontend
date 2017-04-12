import {Component, ViewContainerRef} from '@angular/core';
import './rxjs-operators';
import {Router, NavigationEnd} from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions} from 'ng2-toasty';
import {ResponseHandlerService} from './shared/response-handler.service';
import {environment} from '../environments/environment';
declare var ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;
  public url = null;

  constructor(private router: Router, viewContainerRef: ViewContainerRef, private toastyService: ToastyService,
              private toastyConfig: ToastyConfig, private responseHandler: ResponseHandlerService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
    this.toastyConfig.theme = 'bootstrap';
    this.router.events.subscribe((event) => {
      if (event !== this.url && event instanceof NavigationEnd) {
        this.url = event.url;
        if (environment.production) {
          ga('send', 'pageview', {page: event.url});
        }
      }
    });

    this.responseHandler.message.subscribe(message => {
      if (message) {
        this.addToast(message);
      }
    });
  }

  addToast(mes) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: mes.message,
      showClose: true,
      timeout: 5000
    };

    switch (mes.type) {
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }
}

