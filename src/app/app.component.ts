import {Component, ViewContainerRef} from '@angular/core';
import './rxjs-operators';
import {Router, NavigationEnd} from "@angular/router";
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from "ng2-toasty"
import {ResponseHandlerService} from "./shared/response-handler.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent{
  private viewContainerRef: ViewContainerRef;
  private url = null;
  private value;

  constructor(private router: Router, viewContainerRef: ViewContainerRef, private toastyService: ToastyService, private toastyConfig: ToastyConfig, private responseHandler: ResponseHandlerService) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;
    this.toastyConfig.theme = 'bootstrap';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url
      }
    });

    this.responseHandler.message.subscribe(message => {
      if(message){
        this.addToast(message);
      }
    });
  }

  addToast(mes) {
    var toastOptions: ToastOptions = {
      title: "",
      msg: mes.message,
      showClose: true,
      timeout: 5000,
    };

    switch (mes.type) {
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
}

