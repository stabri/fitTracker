import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MaterialModule} from "./material.module";
import { WelcomeComponent } from './welcome/welcome.component';
import {RoutingModule} from "./routing.module";
import {FlexLayoutModule} from '@angular/flex-layout';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {AuthService} from "./auth/auth.service";
import {TrainingService} from "./training/training.service";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {UiService} from "./shared/ui.service";
import {AuthModule} from "./auth/auth.module";
import {TrainingModule} from "./training/training.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    TrainingModule
  ],
  // provide singleton service
  providers: [
    AuthService,
    TrainingService,
    UiService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
