import { ResponseModel } from './../../../models/response/response.model';
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
  tweets: any[];

  constructor(
    private activeUserService: ActiveUserConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private twitterService: TwitterService
  ) { }


  ngOnInit(): void {
    this.user = this.activeUserService.TwitterUser;
    this.twitterService.GetTweets(this.activeUserService.TwitterUser.ScreenName).subscribe((res: ResponseModel<any[]>) => {
      if (res.IsSuccessful) {
        this.tweets = res.Body;
      }
    });
    this.authenticate();
  }
  authenticate() {
    if (this.activeUserService.TwitterUser) {
       return;
    }
    this.router.navigate(['']);
  }

  gotoUser(user: string): void {
    window.open('https://twitter.com/' + user, '_blank');
  }
  gotoTweet(tweet: any): void {
    if (tweet.retweeted) {
      window.open(`https://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`, '_blank');
    } else {
      window.open(`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`, '_blank');
    }
  }
}
