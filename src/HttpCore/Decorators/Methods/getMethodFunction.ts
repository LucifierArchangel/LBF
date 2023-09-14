import { HttpMethods } from '../../HttpMethods'
import { RequestHandler } from 'express'

/**
 * Create method decorator for request type (GET, POST, PATCH, etc.)
 * @param method
 * @param path
 * @param middlewares
 */
export function getMethodFunction(
    method: HttpMethods,
    path: string,
    middlewares: Array<RequestHandler>
): MethodDecorator {
    /**
     * Method decorator for create route binding for controller
     */
    return (target: any, propertyKey: string | symbol): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor)
        }

        const routes = Reflect.getMetadata(
            'routes',
            target.constructor
        ) as Array<RouteDefinition>

        routes.push({
            path,
            middlewares,
            requestMethod: method,
            methodName: propertyKey,
        })

        Reflect.defineMetadata('routes', routes, target.constructor)
    }
}

import { RouteDefinition } from '../../RouteDefinition'
