import { RequestHandler } from 'express'

/**
 * Return class decorator for create controller's container
 * @param prefix
 * @param middlewares
 * @constructor
 */
export function Controller(
    prefix: string = '',
    ...middlewares: Array<RequestHandler>
): ClassDecorator {
    /**
     * Class decorator for controller creation
     */
    return (target: any) => {
        Reflect.defineMetadata('prefix', prefix, target)

        if (!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target)
        }

        if (!Reflect.hasMetadata('middlewares', target)) {
            Reflect.defineMetadata('middlewares', middlewares, target)
        }
    }
}
