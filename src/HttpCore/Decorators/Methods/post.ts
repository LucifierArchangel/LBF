import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Post method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Post(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.POST, path, middlewares)
}
