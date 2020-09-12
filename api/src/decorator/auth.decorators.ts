import { MetadataKeys } from './../config/meta.config';
// No Auth 

import { AuthTypes } from "../constant/auth.constant";

/**
 * Request Does not need authentication
 *
 * @remarks
 * Can only be used before Request Mapping Annotation
 * 
 */
export function NoAuth() {
    
    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        
        Reflect.defineMetadata(MetadataKeys.auth, [AuthTypes.noAuth], target, key);

        return descriptor;
    }
}

/**
 * Request need only authentication
 *
 * @remarks
 * Can only be used before Request Mapping Annotation
 * 
 */
export function OnlyAuth() {
    
    return function(target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        
        Reflect.defineMetadata(MetadataKeys.request, [AuthTypes.onlyAuth], target, key);

        return descriptor;
    }
}