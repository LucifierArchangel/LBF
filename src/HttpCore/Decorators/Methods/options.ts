import { RequestHandler } from 'express'
import { getMethodFunction } from './getMethodFunction'
import { HttpMethods } from '../../HttpMethods'

/**
 * Options method decorator
 * @param path
 * @param middlewares
 * @constructor
 */
export function Options(
    path: string,
    ...middlewares: Array<RequestHandler>
): MethodDecorator {
    return getMethodFunction(HttpMethods.OPTIONS, path, middlewares)
}
