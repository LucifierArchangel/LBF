import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Patch method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Patch(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.PATCH, path, middlewares)
}
