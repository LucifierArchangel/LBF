import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Head method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Head(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.HEAD, path, middlewares)
}
