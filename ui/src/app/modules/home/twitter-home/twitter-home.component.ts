import { TwitterAuthModel } from './../../../models/twitter-auth.model';
import { TwitterService } from './../../../services/api/twitter.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ActiveUserConfigService } from './../../../services/api/active-user-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitter-home',
  templateUrl: './twitter-home.component.html',
  styleUrls: ['./twitter-home.component.scss']
})
export class TwitterHomeComponent implements OnInit {

  user: TwitterAuthModel;

  constructor(
    private activeUserService: ActiveUserConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private twitterService: TwitterService
  ) { }


  ngOnInit(): void {
    this.user = this.activeUserService.TwitterUser;
    this.twitterService.GetTweets(this.activeUserService.TwitterUser.ScreenName).subscribe((e) => {
      console.log('quick-log: HomeComponent -> ngOnInit -> e', e);

    });
    this.authenticate();
  }
  authenticate() {
    if (this.activeUserService.TwitterUser) {
       return;
    }
    this.router.navigate(['']);
  }
}
