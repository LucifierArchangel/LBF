import { HttpMethods } from '../../HttpMethods'
import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'

/**
 * Decorator for optional method
 * @param method
 * @param path
 * @param middlewares
 * @constructor
 */
export function Method(
    method: HttpMethods,
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(method, path, middlewares)
}
