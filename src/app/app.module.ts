import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import {HttpModule, JsonpModule} from '@angular/http';
// external modules
import {ToastyModule} from 'ng2-toasty';
import {ModalModule, TypeaheadModule, TabsModule} from 'ngx-bootstrap';
// components
import {AppComponent} from './app.component';
// modules
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {AboutModule} from './about/about.module';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {NotFoundModule} from './not-found/not-found.module';
import {ProfileModule} from './profile/profile.module';
import {ProjectsModule} from './projects/projects.module';
import {StartProjectModule} from './start-project/start-project.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    SharedModule,
    CoreModule.forRoot(),
    AboutModule,
    HomeModule,
    LoginModule,
    NotFoundModule,
    ProfileModule,
    ProjectsModule,
    StartProjectModule,
    HttpModule,
    JsonpModule,
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
