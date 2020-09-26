import { ActiveUserConfigService } from './../../../../services/api/active-user-config.service';
import { TwitterService } from './../../../../services/api/twitter.service';
import { ConfigResponse } from './../../../../models/response/config-response.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EnvConfigService } from './../../../../services/api/env-config.service';
import { Component, OnInit } from '@angular/core';
import { TwitterAuthModel } from './../../../../models/twitter-auth.model';

@Component({
  selector: 'app-twitter-callback',
  templateUrl: './twitter-callback.component.html',
  styleUrls: ['./twitter-callback.component.scss']
})
export class TwitterCallbackComponent implements OnInit {

  params: TwitterAuthModel;

  env: ConfigResponse;

  constructor(
    private envConfig: EnvConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private twitterService: TwitterService,
    private activeUserService: ActiveUserConfigService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.params = TwitterAuthModel.fromParam(params);
      if (this.params.OAuthToken) {
        this.activeUserService.TwitterUser = this.params;
        this.router.navigate(['/home/twitter']);
      } else {
        this.getAccessToken();
      }
      this.loadConfig();
    });
  }

  private loadConfig() {
    this.envConfig.getConfigurations().subscribe((res) => {
      if (res.IsSuccessful) {
        this.env = res.Body;
      }
    });
  }

  getAccessToken() {
    window.location.href = 'http://127.0.0.1:3000/auth/twitter';
  }
}
