import {Component, ViewContainerRef} from '@angular/core';
import './rxjs-operators';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private viewContainerRef: ViewContainerRef;
  private url = null;

  constructor(private router: Router, viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url
      }
    });
  }
}

