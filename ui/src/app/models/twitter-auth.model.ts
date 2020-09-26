import { Params } from '@angular/router';

export class TwitterAuthModel {
  // oauth_token,oauth_token_secret,user_id,screen_name
  OAuthToken: string;
  OAuthTokenSecret: string;
  UserId: string;
  ScreenName: string;

  static fromParam(params: Params): TwitterAuthModel {
    const model = new TwitterAuthModel();

    model.OAuthToken = params.oauth_token;
    model.OAuthTokenSecret = params.oauth_token_secret;
    model.UserId = params.user_id;
    model.ScreenName = params.screen_name;

    return model;
  }
}
