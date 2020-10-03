import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TwitterHomeComponent } from './twitter-home/twitter-home.component';
import { TwitterSideCardComponent } from './twitter-home/twitter-side-card/twitter-side-card.component';


@NgModule({
  declarations: [HomeComponent, TwitterHomeComponent, TwitterSideCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule
  ]
})
export class HomeModule { }
