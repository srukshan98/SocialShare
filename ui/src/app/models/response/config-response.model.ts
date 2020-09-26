export class ConfigResponse {
  Twitter: SocialConfigResponse;
}

class SocialConfigResponse {
  RequestTokenURL: string;
  Key: string;
  KeySecret: string;
}
