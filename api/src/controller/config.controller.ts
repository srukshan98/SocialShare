import { RequestConfig } from "../config/request.config";
import { ResponseConfig } from "../config/response.config";
import { NoAuth } from "../decorator/auth.decorators";
import { Body, RequestMapping, Route } from "../decorator/request.decorator";
import { AbstractController } from "./abstract.controller";

@Route('/configuration')
export class ConfigController extends AbstractController {
    @NoAuth()
    @RequestMapping()
    public async GetAll(): Promise<ResponseConfig> {
        const body = {
            Twitter: {
                RequestTokenURL: 'https://api.twitter.com/oauth/request_token',
                Key: '3Rdn3w51kDLSCzErYiFWzPdJj',
                KeySecret: 'YSWptoFUh9W5r5NO20P0xEfAvrBNCqbCKDg8tRC1kTawU61mX6'
            }
        };
        
        return {
            IsSuccessful: true,
            Status: 200,
            Body: body
        };
    }
}