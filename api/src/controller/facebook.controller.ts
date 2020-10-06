import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import path from 'path';

import { RequestType } from "../constant/request.constant";
import { NoAuth } from "../decorator/auth.decorators";
import { RequestMapping, Route, Response as QResponse, Request as QRequest, Query } from "../decorator/request.decorator";
import { AbstractController } from "./abstract.controller";
import { Facebook } from './../config/secrets';
import { ResponseConfig } from './../config/response.config';

@Route('/facebook')
export class FacebookController extends AbstractController {
    @NoAuth()
    @RequestMapping(RequestType.GET, '/callback')
    public async GetAccessToken(@Query code: string, @QResponse response: Response): Promise<ResponseConfig | void> {
        try {
            const redirectUri = 'https://127.0.0.1:3000/facebook/callback';

            const res: AxiosResponse<any> = await axios.post(`https://graph.facebook.com/v8.0/oauth/access_token?client_id=${Facebook.clientId}&redirect_uri=${redirectUri}&client_secret=${Facebook.clientSecret}&code=${code}`);

            const verifyRes: AxiosResponse<any> = await axios.get(`https://graph.facebook.com/v8.0/debug_token?input_token=${res.data.access_token}&access_token=${Facebook.clientId +'|' + Facebook.clientSecret}`);

            const params = {
                access_token: res.data.access_token,
                user_id: verifyRes.data.data.user_id
            };

            const searchParams = new URLSearchParams();
            Object.keys(params).forEach(key => searchParams.append(key, params[key]));
            const paramStr = searchParams.toString();
            response.redirect(`http://localhost:4200/auth-callback/facebook?${paramStr}`);
            
        } catch (error) {
            response.sendFile('err_500.html', { root: path.join(__dirname, '../public') }, (err) => {
                if (err) {
                    response.status(500).send({
                        IsSuccessful: false,
                        Status: 500,
                        Body: err
                    });
                }
            });
        }
    }

    @NoAuth()
    @RequestMapping(RequestType.GET, '/posts')
    public async GetTweets(@QRequest request: Request): Promise<ResponseConfig> {
        try {
            const access_token = request.headers['x-facebook-access-token'] as string;
            const user_id = request.headers['x-facebook-access-user-id'] as string;
    
            const res: AxiosResponse<any> = await axios.get(`https://graph.facebook.com/v8.0/${user_id}/posts?fields=id,message,link,attachments{media}`, {
                headers: {
                    Authorization: 'Bearer '+ access_token
                }
            });

            return {
                IsSuccessful: true,
                Status: 200,
                Body: res.data.data
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