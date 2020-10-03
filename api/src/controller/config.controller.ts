import { ResponseConfig } from "../config/response.config";
import { NoAuth } from "../decorator/auth.decorators";
import { RequestMapping, Route } from "../decorator/request.decorator";
import { AbstractController } from "./abstract.controller";
import * as secrets from '../config/secrets';

@Route('/configuration')
export class ConfigController extends AbstractController {
    @NoAuth()
    @RequestMapping()
    public async GetAll(): Promise<ResponseConfig> {
        const body = {
            Twitter: {
                RequestTokenURL: 'https://api.twitter.com/oauth/request_token',
                Key: secrets.Twitter.consumerKey,
                KeySecret: secrets.Twitter.consumerSecret
            }
        };
        
        return {
            IsSuccessful: true,
            Status: 200,
            Body: body
        };
    }
}