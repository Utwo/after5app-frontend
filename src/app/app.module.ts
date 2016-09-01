import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { routing, appRoutingProviders } from './app.routing';
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
  imports: [
    routing,
    BrowserModule
  ],
  declarations: [AppComponent, NotFoundComponent],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }