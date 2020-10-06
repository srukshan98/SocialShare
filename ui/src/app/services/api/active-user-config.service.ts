import { FacebookAuthModel } from './../../models/facebook-auth.model';
import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TwitterAuthModel } from '../../models/twitter-auth.model';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserConfigService {
  activeUser: UserModel;
  private twitterUser: TwitterAuthModel;
  private facebookUser: FacebookAuthModel;


  constructor(
  ) { }
  set TwitterUser(params: TwitterAuthModel) {
    localStorage.setItem('twitter-user', JSON.stringify(params));
    this.twitterUser = params;
  }
  get TwitterUser(): TwitterAuthModel {
    if (this.twitterUser) {
      return this.twitterUser;
    }
    const objString: string = localStorage.getItem('twitter-user');
    if (objString) {
      return JSON.parse(objString);
    }
    return null;
  }

  set FacebookUser(params: FacebookAuthModel) {
    localStorage.setItem('facebook-user', JSON.stringify(params));
    this.facebookUser = params;
  }

  get FacebookUser(): FacebookAuthModel {
    if (this.facebookUser) {
      return this.facebookUser;
    }
    const objString: string = localStorage.getItem('facebook-user');
    if (objString) {
      return JSON.parse(objString);
    }
    return null;
  }

  logout() {
    this.activeUser = null;
    this.TwitterUser = null;
    this.FacebookUser = null;
  }
}
