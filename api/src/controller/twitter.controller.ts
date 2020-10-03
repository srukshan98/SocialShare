import { Twitter } from './../model/twitter';
import { ResponseConfig } from './../config/response.config';
import { Request, Response } from 'express';
import { RequestType } from "../constant/request.constant";
import { NoAuth } from "../decorator/auth.decorators";
import { RequestMapping, Route, Response as QResponse, Request as QRequest } from "../decorator/request.decorator";
import { AbstractController } from "./abstract.controller";
import axios, { AxiosResponse } from 'axios';
import { TwitterAccessTokenResponse } from '../model/response/twitter/twitter-access-token.response';
import { TwitterUser } from '../model/twitter-user.model';

@Route('/twitter')
export class TwitterController extends AbstractController {
    @NoAuth()
    @RequestMapping(RequestType.GET, '/callback')
    public async GetAccessToken(oauth_token: string, oauth_verifier: string, @QResponse response: Response): Promise<ResponseConfig | void> {
        try {
            const res: AxiosResponse<any> = await axios.post(`https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`)
                
            const resObj: TwitterAccessTokenResponse = JSON.parse('{"' + decodeURI(res.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');

            let twitter = new Twitter(resObj.oauth_token, resObj.oauth_token_secret);

            const user: TwitterUser = await twitter.verifyCredentials()
            const params = {...resObj, ...user, requestToken: oauth_token};
            const searchParams = new URLSearchParams();
            Object.keys(params).forEach(key => searchParams.append(key, params[key]));
            const paramStr = searchParams.toString();
            response.redirect(`http://127.0.0.1:4200/auth-callback/twitter?${paramStr}`);
            
        } catch (error) {
            return {
                IsSuccessful: false,
                Status: 500,
                Body: error
            };
        }
    }

    @NoAuth()
    @RequestMapping(RequestType.GET, '/tweets')
    public async GetTweets(screenName: string, @QRequest request: Request): Promise<ResponseConfig> {
        try {
            let twitter = new Twitter(
                request.headers['x-twitter-access-token'] as string,
                request.headers['x-twitter-access-token-secret'] as string
            );
    
            const res: ResponseConfig = await twitter.get(`/statuses/user_timeline.json?screen_name=${screenName}&exclude_replies=true&include_rts=true&count=20`);

            return {
                IsSuccessful: true,
                Status: 200,
                Body: res.Body
            };
        } catch (e) {
            return {
                IsSuccessful: false,
                Status: 500,
                Body: e
            };
        }
    }
}