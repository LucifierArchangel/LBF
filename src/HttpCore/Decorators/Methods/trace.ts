import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Trace method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Trace(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.TRACE, path, middlewares)
}
