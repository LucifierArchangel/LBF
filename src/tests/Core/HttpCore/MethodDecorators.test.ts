import "reflect-metadata";
import {
  Delete,
  Get,
  Head,
  HttpMethods,
  Options,
  Patch,
  Post,
  Put,
  RouteDefinition,
  Trace,
} from "../../..";
import { NextFunction, Request, RequestHandler, Response } from "express";

const decoratorsMap: {
  [index in HttpMethods]: (
    path: string,
    ...middlewares: RequestHandler[]
  ) => MethodDecorator;
} = {
  [HttpMethods.GET]: Get,
  [HttpMethods.HEAD]: Head,
  [HttpMethods.PUT]: Put,
  [HttpMethods.DELETE]: Delete,
  [HttpMethods.PATCH]: Patch,
  [HttpMethods.OPTIONS]: Options,
  [HttpMethods.POST]: Post,
  [HttpMethods.TRACE]: Trace,
};

for (const method of Object.keys(decoratorsMap)) {
  describe(`@${
    method[0].toUpperCase() + method.substr(1)
  } decorator test`, () => {
    const methodGetter = decoratorsMap[method as HttpMethods];
    const middleware: RequestHandler = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      next();
    };

    it("should properly attach router", () => {
      class Bar {
        @methodGetter("/path", middleware)
        func() {}
      }

      expect(Reflect.getMetadata("prefix", Bar)).toBeUndefined;

      const routes: RouteDefinition[] = Reflect.getMetadata("routes", Bar);

      expect(routes).toBeInstanceOf(Array);
      expect(routes.length).toEqual(1);

      expect(routes[0].methodName).toEqual("func");
      expect(routes[0].path).toEqual("/path");
      expect(routes[0].requestMethod).toEqual(method);
      expect(routes[0].middlewares).toEqual([middleware]);
    });
  });
}
