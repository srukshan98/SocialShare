import { IRequest } from '../model/request.model';
import { ParmTypes } from './../config/request.config';
import { ResponseConfig } from './../config/response.config';
import { Request, Response, RequestHandler } from "express";
import { MetadataKeys } from '../config/meta.config';
import { GetParameters } from '../functions/configurations';

export function RequestProvider(target: object, methodName: string | symbol, method: Function, path: string): RequestHandler {
    return async (request: IRequest, response: Response) => {

        const params: any[] = GetParams(target, methodName, method, path, request, response);

        const env = SetConfigurations(request);

        const methodResponse: ResponseConfig = await method.apply(env, params);

        if (methodResponse) {
            if (methodResponse.IsSuccessful) {
                response.status(200).send(methodResponse);
            } else {
                response.status(methodResponse.Status).send(methodResponse);
            }
        }
    }
}

function GetParams(target: object, methodName: string | symbol, method: Function, path: string, request: Request, response: Response): any[] {
    const methodParms: string[] = GetParameters(method);
    const urlQueryParms: string[] = path.match(/(?<=:)(\w)*/g);
    const decParms: ParmTypes[] = Reflect.getOwnMetadata(MetadataKeys.request, target, methodName) || [];
    const requestParms: any[] = [];

    for (let index: number = 0; index < methodParms.length; index++) {
        const parm: string = methodParms[index];

        //#region  Assigning By Annotations
        if (decParms[index] != null) {
            switch(decParms[index]) {
                case ParmTypes.Body: 
                    requestParms[index] = request.body;
                    break;
                case ParmTypes.Query:
                    requestParms[index] = request.query[parm];
                    break;
                case ParmTypes.Request:
                    requestParms[index] = request;
                    break;
                case ParmTypes.Response:
                    requestParms[index] = response;
                    break;
                default:
                    break;
            }
            continue;
        }
        //#endregion

        //#region Assigning Query Parameters
        const queryParmId: number = urlQueryParms ? urlQueryParms.findIndex((qParm: string) => parm === qParm) : -1;
        if (queryParmId !== -1) {
            requestParms[index] = request.params[parm];
            continue;
        }
        //#endregion

        //#region Assinging Parameters
        const parmId: number = Object.keys(request.query).findIndex((qParm: string) => parm === qParm);
        if (parmId !== -1) {
            requestParms[index] = request.query[parm];
            continue;
        }
        //#endregion

        requestParms[index] = request.body[parm];
    }

    return requestParms;
}

function SetConfigurations(request: IRequest): {[key:string]: any} {
    return {
        connection: request.config.connection,
        user: request.config.user
    };
}