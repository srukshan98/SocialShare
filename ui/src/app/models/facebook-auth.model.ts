import { Params } from '@angular/router';

export class FacebookAuthModel {
  AccessToken: string;
  UserId: string;


  static fromParam(params: Params): FacebookAuthModel {
    const model = new FacebookAuthModel();

    model.AccessToken = params.access_token;
    model.UserId = params.user_id;

    return model;
  }
}
