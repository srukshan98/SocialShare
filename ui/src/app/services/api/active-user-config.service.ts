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


  constructor(
    private router: ActivatedRoute
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
}
