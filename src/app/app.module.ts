import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { ProjectsModule } from './projects/projects.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule,
    ProjectsModule
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
