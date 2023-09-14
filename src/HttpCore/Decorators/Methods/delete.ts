import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Delete method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Delete(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.DELETE, path, middlewares)
}
