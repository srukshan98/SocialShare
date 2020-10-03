import { ActiveUserConfigService } from './../api/active-user-config.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private activeUserService: ActiveUserConfigService
  ) { }

  getAuthToken(): string {
    if (this.activeUserService.TwitterUser) {
      return this.activeUserService.TwitterUser.OAuthToken;
    }
  }
}
