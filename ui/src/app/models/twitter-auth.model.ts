import { Params } from '@angular/router';

export class TwitterAuthModel {
  // oauth_token,oauth_token_secret,user_id,screen_name
  OAuthToken: string;
  OAuthTokenSecret: string;
  RequestToken: string;
  UserId: string;
  ScreenName: string;

  user: TwitterUser;

  static fromParam(params: Params): TwitterAuthModel {
    const model = new TwitterAuthModel();

    model.OAuthToken = params.oauth_token;
    model.OAuthTokenSecret = params.oauth_token_secret;
    model.UserId = params.user_id;
    model.ScreenName = params.screen_name;
    model.RequestToken = params.requestToken;

    model.user = new TwitterUser();

    model.user.id = params.id;
    model.user.idStr = params.id_str;
    model.user.name = params.name;
    model.user.screenName = params.screen_name;
    model.user.location = params.location;
    model.user.description = params.description;
    model.user.url = params.url;
    model.user.protected = params.protected;
    model.user.followersCount = params.followers_count;
    model.user.friendsCount = params.friends_count;
    model.user.listedCount = params.listed_count;
    model.user.createdAt = params.created_at;
    model.user.favoritesCount = params.favourites_count;
    model.user.utcOffset = params.utc_offset;
    model.user.timeZone = params.time_zone;
    model.user.geoEnabled = params.geo_enabled;
    model.user.verified = params.verified;
    model.user.statusesCount = params.statuses_count;
    model.user.lang = params.lang;
    model.user.contributorsEnabled = params.contributors_enabled;
    model.user.isTranslator = params.is_translator;
    model.user.isTranslationEnabled = params.is_translation_enabled;
    model.user.profileBackgroundColor = params.profile_background_color;
    model.user.profileBackgroundImageUrl = params.profile_background_image_url;
    model.user.profileBackgroundImageUrlHttps = params.profile_background_image_url_https;
    model.user.profileBackgroundTile = params.profile_background_tile;
    model.user.profileImageUrl = params.profile_image_url;
    model.user.profileImageUrlHttps = params.profile_image_url_https;
    if (model.user.profileImageUrlHttps) {
      model.user.profileImageUrlHttps = model.user.profileImageUrlHttps.replace('_normal.', '.');
    }
    model.user.profileBannerUrl = params.profile_banner_url;
    model.user.profileLinkColor = params.profile_link_color;
    model.user.profileSidebarBorderColor = params.profile_sidebar_border_color;
    model.user.profileSidebarFillColor = params.profile_sidebar_fill_color;
    model.user.profileTextColor = params.profile_text_color;
    model.user.profileUseBackgroundImage = params.profile_use_background_image;
    model.user.hasExtendedProfile = params.has_extended_profile;
    model.user.defaultProfile = params.default_profile;
    model.user.defaultProfileImage = params.default_profile_image;
    model.user.following = params.following;
    model.user.followRequestSent = params.follow_request_sent;
    model.user.notifications = params.notifications;
    model.user.translatorType = params.translator_type;
    model.user.suspended = params.suspended;
    model.user.needsPhoneVerification = params.needs_phone_verification;

    return model;
  }
}

export class TwitterUser {
  id: number;
  idStr: string;
  name: string;
  screenName: string;
  location: string;
  description: string;
  url: string;
  protected: boolean;
  followersCount: number;
  friendsCount: number;
  listedCount: number;
  createdAt: string;
  favoritesCount: number;
  utcOffset: any;
  timeZone: any;
  geoEnabled: boolean;
  verified: boolean;
  statusesCount: number;
  lang: any;
  contributorsEnabled: boolean;
  isTranslator: boolean;
  isTranslationEnabled: boolean;
  profileBackgroundColor: string;
  profileBackgroundImageUrl: any;
  profileBackgroundImageUrlHttps: any;
  profileBackgroundTile: boolean;
  profileImageUrl: string;
  profileImageUrlHttps: string;
  profileBannerUrl: string;
  profileLinkColor: string;
  profileSidebarBorderColor: string;
  profileSidebarFillColor: string;
  profileTextColor: string;
  profileUseBackgroundImage: boolean;
  hasExtendedProfile: boolean;
  defaultProfile: boolean;
  defaultProfileImage: boolean;
  following: boolean;
  followRequestSent: boolean;
  notifications: boolean;
  translatorType: string;
  suspended: boolean;
  needsPhoneVerification: boolean;
}
