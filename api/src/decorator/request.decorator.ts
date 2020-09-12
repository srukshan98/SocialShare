import { ParmTypes, ParmValues } from './../config/request.config';
import { RouteType } from './../constant/route.constant';
import { RequestType } from "../constant/request.constant";
import { Router, RequestHandler } from 'express';
import { RequestProvider } from '../provider/request.provider';
import "reflect-metadata";
import { MetadataKeys } from '../config/meta.config';
import { AuthProvider } from '../provider/auth.provider';

export const routes: RouteType[] = [];
export const defaultPaths: string[] = [
    '/ : GET',
    '/ : POST',
    '/:id : GET',
    '/:id : PUT',
    '/:id : DELETE',
];
/**
 *Route Decorator For Controllers
 *
 * @param {string} path The Controller Route Path
 */
export function Route(path: string, location: string) {
    
    return function(constructor: Function) {
        constructor.prototype.location = location;
        let newPath: string = path.substr(0, 1) === '/' ? path : ('/' + path);
        routes.push({
            path: newPath,
            router: constructor.prototype.router
        });
    }
}
/**
 *Request Mapping Decorator to map Requests
 *
 * @remarks
 * Can only be used inside Classes with Route Decorator
 *
 * @param {RequestType} [type=RequestType.GET]
 * @param {string} [path='/']
 */
export function RequestMapping(type: RequestType = RequestType.GET, path: string = '/') {
    
    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        let prototype: any = target.constructor.prototype;
        if (!prototype.router) {
            prototype.router = Router();
        }

        let router: Router = prototype.router;
        const method: RequestHandler = RequestProvider(target, key, descriptor.value, path);
        const auth: RequestHandler = AuthProvider(target, key, type);
        
        switch (type) {
            case RequestType.DEL:
                router.delete(path, auth, method);
                break;
            case RequestType.POST:
                router.post(path, auth, method);
                break;
            case RequestType.PUT:
                router.put(path, auth, method);
                break;
            default: router.get(path, auth, method);
        }
        
        return descriptor;
    }
}

/**
 *Body Annotation - Bind Body of Request
 * 
 * @remarks
 * Cany Only Be used inside RequestMapping Annotated Methods.
 *
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 * @param {number} parameterIndex
 */
export function Body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    
    let existingRequiredParameters: ParmTypes[] = Reflect.getOwnMetadata(MetadataKeys.request, target, propertyKey) || [];
    existingRequiredParameters[parameterIndex] = ParmTypes.Body;
    Reflect.defineMetadata(MetadataKeys.request, existingRequiredParameters, target, propertyKey);
}

/**
 *Query Annotation - Bind Named Query of Request
 * 
 * @remarks
 * Cany Only Be used inside RequestMapping Annotated Methods.
 *
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 * @param {number} parameterIndex
 */
export function Query(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: ParmTypes[] = Reflect.getOwnMetadata(MetadataKeys.request, target, propertyKey) || [];
    existingRequiredParameters[parameterIndex] = ParmTypes.Query;
    Reflect.defineMetadata(MetadataKeys.request, existingRequiredParameters, target, propertyKey);
}

/**
 *Request Annotation - Bind Request
 * 
 * @remarks
 * Cany Only Be used inside RequestMapping Annotated Methods.
 *
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 * @param {number} parameterIndex
 */
export function Request(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: ParmTypes[] = Reflect.getOwnMetadata(MetadataKeys.request, target, propertyKey) || [];
    existingRequiredParameters[parameterIndex] = ParmTypes.Request;
    Reflect.defineMetadata(MetadataKeys.request, existingRequiredParameters, target, propertyKey);
}

/**
 *Response Annotation - Bind Response
 * 
 * @remarks
 * Cany Only Be used inside RequestMapping Annotated Methods.
 *
 * @param {Object} target
 * @param {(string | symbol)} propertyKey
 * @param {number} parameterIndex
 */
export function Response(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: ParmTypes[] = Reflect.getOwnMetadata(MetadataKeys.request, target, propertyKey) || [];
    existingRequiredParameters[parameterIndex] = ParmTypes.Response;
    Reflect.defineMetadata(MetadataKeys.request, existingRequiredParameters, target, propertyKey);
}

// const _mapper: ParmValues = {};
// Object.keys(ParmTypes).forEach((type: string) => {
//     _mapper[type] = (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
//         let existingRequiredParameters: string[] = Reflect.getOwnMetadata(MetadataKeys.request, target, propertyKey) || [];
//         existingRequiredParameters[parameterIndex] = ParmTypes[type];
//         Reflect.defineMetadata(MetadataKeys.request, existingRequiredParameters, target, propertyKey);
//     }
// });
// export const Mapper = _mapper;