import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { LoginService } from './login.service';
import { AuthGuard } from './auth-guard.service';
import { StateService } from './state.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SearchComponent } from './navigation/search/search.component';
import { UserNavComponent } from './navigation/user-nav/user-nav.component';
import { NotificationComponent } from './navigation/user-nav/notification/notification.component';
import { NotificationsService } from './navigation/user-nav/shared/notifications.service';
import { SharedModule } from '../shared/shared.module';
import { ResponseHandlerService } from './response-handler.service';
import { TypeaheadModule, ModalModule } from 'ngx-bootstrap';

@NgModule({
  imports: [CommonModule, SharedModule, TypeaheadModule.forRoot(), ModalModule.forRoot()],
  declarations: [FooterComponent, NavigationComponent, SearchComponent, UserNavComponent, NotificationComponent],
  exports: [FooterComponent, NavigationComponent, SearchComponent, UserNavComponent, NotificationComponent]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        LoginService,
        StateService,
        NotificationsService,
        ResponseHandlerService,
        AuthGuard
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
