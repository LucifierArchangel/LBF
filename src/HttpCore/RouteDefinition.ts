import { HttpMethods } from './HttpMethods'
import { RequestHandler } from 'express'

/**
 * Route definition interface
 */
export interface RouteDefinition {
    path: string
    requestMethod: HttpMethods
    methodName: string | symbol
    middlewares: Array<RequestHandler>
}
