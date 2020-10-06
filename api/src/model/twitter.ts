import { TwitterUser } from './twitter-user.model';
import { ResponseConfig } from './../config/response.config';
import { OAuth } from 'oauth';
import { IncomingMessage } from 'http';
import { Twitter as secret } from '../config/secrets';

const baseUrl = 'https://api.twitter.com/1.1';
export class Twitter {
    private consumerKey: string = secret.consumerKey;
    private consumerSecret: string = secret.consumerSecret;

    private auth: OAuth = new OAuth("https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token",
        this.consumerKey, this.consumerSecret, "1.0A", null, "HMAC-SHA1");
    constructor(
        private accessToken: string = null,
        private accessTokenSecret: string = null,
    ) { }

    get(uri: string): Promise<ResponseConfig> {
        return new Promise((resolve: (value?: ResponseConfig) => void, reject: (reason?: any) => void) => {
            try {
                this.auth.get(baseUrl + uri, this.accessToken, this.accessTokenSecret, (err: any, result?: string, response?: IncomingMessage) => {
                    if (err) {
                        reject(err);
                    } else {
                        let parsedData: object;
                        try {
                            parsedData = JSON.parse(result);
                        } catch (e) {
                            reject({
                                err,
                                result,
                                response
                            });
                        }
                        resolve({
                            IsSuccessful: true,
                            Status: 200,
                            Body: parsedData
                        });
                    }
                });

            } catch (e) {
                reject(e);
            }
        });
    }

    verifyCredentials(): Promise<TwitterUser> {
        return new Promise((res: (value: TwitterUser) => void, rej: (reason: any) => void) => {
            var url = baseUrl + "/account/verify_credentials.json";
            this.auth.get(url, this.accessToken, this.accessTokenSecret, function (error, data: string, response) {
                if (error) {
                    rej(error);
                } else {
                    try {
                        var parsedData = JSON.parse(data);
                    } catch (e) {
                        rej({error: e, data, response});
                    }
                    res(parsedData);
                }
            });
        })
    }

    authenticate(): Promise<AuthRes> {
        return new Promise((resolve, reject: (reason?: any) => void) => {
            this.auth.getOAuthRequestToken({
                'oauth_callback': 'http://127.0.0.1:3000/twitter/callback'
            }, (err: { statusCode: number; data?: any; }, token: string, tokenSecret: string, parsedQueryString: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        token,
                        tokenSecret,
                        parsedQueryString
                    });
                }
            })
        })
    }
}

type AuthRes = {
    token: string,
    tokenSecret: string,
    parsedQueryString: any
}