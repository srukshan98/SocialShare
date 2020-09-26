import { Permission } from './../constant/permission.constant';
import { MetadataKeys } from './../config/meta.config';
import { AuthTypes } from './../constant/auth.constant';
import { RequestType } from './../constant/request.constant';
import { Response, NextFunction } from 'express';
import { IRequest } from './../model/request.model';
import { UserLocationModel } from '../model/user-location.model';
export function AuthProvider(target: object, methodName: string | symbol, requestType: RequestType){
    return (request: IRequest, response: Response, next: NextFunction) => {
        const authParm: AuthTypes[] = Reflect.getOwnMetadata(MetadataKeys.auth, target, methodName) || null;

        if (authParm && authParm[0] === AuthTypes.noAuth) {
            next();
            return;
        }

        if (!request.config.user) {
            response.status(401).send('Authentication Error');
            return;
        }

        if (authParm && authParm[0] === AuthTypes.onlyAuth) {
            next();
            return;
        }

        if (target.constructor.prototype.location == null || isAuthorised(request.config.user.Locations, target.constructor.prototype.location, requestType)) {
            next();
        } else {
            response.status(403).send('Access UnAuthorised');
            return;
        }
    }
}

function isAuthorised(locations: UserLocationModel[], location: string, requestType: RequestType): boolean {
    const currentLocation: UserLocationModel = locations.find((loc: UserLocationModel) => loc.LocationValue === location);

    if (currentLocation) {
        switch (requestType) {
            case RequestType.DEL:
                return currentLocation.PermissionLevel >= Permission.Delete;
            case RequestType.POST:
            case RequestType.PUT:
                return currentLocation.PermissionLevel >= Permission.Write;
            case RequestType.GET:
                return currentLocation.PermissionLevel >= Permission.Read;
            default:
                return false;
        }
    } else {
        return false;
    }
}