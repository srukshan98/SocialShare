import { FacebookHomeComponent } from './facebook-home/facebook-home.component';
import { TwitterHomeComponent } from './twitter-home/twitter-home.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'twitter',
    component: TwitterHomeComponent
  },
  {
    path: 'facebook',
    component: FacebookHomeComponent
  },
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
