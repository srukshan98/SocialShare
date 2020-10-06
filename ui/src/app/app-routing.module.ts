import { FacebookCallbackComponent } from './shared/components/auth-callbacks/facebook-callback/facebook-callback.component';
import { TwitterCallbackComponent } from './shared/components/auth-callbacks/twitter-callback/twitter-callback.component';
import { LoginComponent } from './shared/components/login/login.component';
import { BaseComponent } from './shared/components/base/base.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'auth-callback',
    children: [
      {
        path: 'twitter',
        component: TwitterCallbackComponent
      },
      {
        path: 'facebook',
        component: FacebookCallbackComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
