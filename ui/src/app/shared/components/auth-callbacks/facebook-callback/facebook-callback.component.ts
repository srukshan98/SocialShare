import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-facebook-callback',
  templateUrl: './facebook-callback.component.html',
  styleUrls: ['./facebook-callback.component.scss']
})
export class FacebookCallbackComponent implements OnInit {

  // params: TwitterAuthModel;

  // env: ConfigResponse;

  constructor(
    // private envConfig: EnvConfigService,
    private route: ActivatedRoute,
    private router: Router,
    // private activeUserService: ActiveUserConfigService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      console.log('quick-log: TwitterCallbackComponent -> ngOnInit -> params', params);
      // this.params = TwitterAuthModel.fromParam(params);
      /*if (this.params.OAuthToken) {
        this.activeUserService.TwitterUser = this.params;
        this.router.navigate(['/home/twitter']);
      } else {*/
        this.getAccessToken();
      // }
      this.loadConfig();
    });
  }

  private loadConfig() {
    /*this.envConfig.getConfigurations().subscribe((res) => {
      if (res.IsSuccessful) {
        this.env = res.Body;
      }
    });*/
  }

  getAccessToken() {
    window.location.href = 'https://127.0.0.1:3000/auth/facebook';
  }
}
