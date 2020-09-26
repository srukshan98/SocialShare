import { Response } from 'express';
import { ResponseConfig } from "../config/response.config";
import { RequestType } from "../constant/request.constant";
import { NoAuth } from "../decorator/auth.decorators";
import { RequestMapping, Route, Response as QResponse } from "../decorator/request.decorator";
import { AbstractController } from "./abstract.controller";
import axios, { AxiosResponse } from 'axios';
import { TwitterAccessTokenResponse } from '../model/response/twitter/twitter-access-token.response';

@Route('/twitter')
export class TwitterController extends AbstractController {
    @NoAuth()
    @RequestMapping(RequestType.GET, '/callback')
    public async GetAccessToken(oauth_token: string, oauth_verifier: string, @QResponse response: Response): Promise<void> {
        axios.post(`https://api.twitter.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`).then((res: AxiosResponse<any>) => {
            
            const resObj: TwitterAccessTokenResponse = JSON.parse('{"' + decodeURI(res.data).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
                 
            response.redirect(`http://127.0.0.1:4200/auth-callback/twitter?${res.data}`);
        }).catch((e) => {
            console.log(e);
            response.status(500).send(e);
        });
    }
}