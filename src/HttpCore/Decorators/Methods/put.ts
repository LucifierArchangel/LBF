import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Puth method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Put(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.PUT, path, middlewares)
}
