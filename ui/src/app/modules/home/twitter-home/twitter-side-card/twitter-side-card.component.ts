import { TwitterUser } from './../../../../models/twitter-auth.model';
import { ActiveUserConfigService } from './../../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitter-side-card',
  templateUrl: './twitter-side-card.component.html',
  styleUrls: ['./twitter-side-card.component.scss']
})
export class TwitterSideCardComponent implements OnInit {
  user: TwitterUser;

  constructor(
    private activeUserService: ActiveUserConfigService
  ) { }

  ngOnInit(): void {
    this.user = this.activeUserService.TwitterUser.user;
  }

  getBgColor(): string {
    console.log(this.user);
    return '#' + this.user.profileSidebarFillColor;
  }
}
