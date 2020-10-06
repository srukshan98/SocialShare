import { MaterialModule } from './shared/modules/material/material.module';
import { BaseComponent } from './shared/components/base/base.component';
import { ThemeModule } from './shared/modules/theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LoginComponent } from './shared/components/login/login.component';
import { TwitterCallbackComponent } from './shared/components/auth-callbacks/twitter-callback/twitter-callback.component';
import { HttpClientModule } from '@angular/common/http';
import { MDBRootModule } from "angular-bootstrap-md";
import { FacebookCallbackComponent } from './shared/components/auth-callbacks/facebook-callback/facebook-callback.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    TwitterCallbackComponent,
    FacebookCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    ThemeModule,
    MaterialModule,
    HttpClientModule,
    MDBRootModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
