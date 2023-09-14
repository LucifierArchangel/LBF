import "reflect-metadata";

import { Controller } from "../../..";
import { NextFunction, Request, RequestHandler, Response } from "express";

describe("@Controller decorator test", () => {
  it("should properly init data", () => {
    @Controller()
    class Bar {}

    expect(Reflect.getMetadata("prefix", Bar)).toBeUndefined;
    expect(Reflect.getMetadata("routes", Bar)).toEqual([]);
    expect(Reflect.getMetadata("middlewares", Bar)).toEqual([]);
  });

  it("should properly init data with prefix", () => {
    @Controller("/prefix")
    class Bar {}

    expect(Reflect.getMetadata("prefix", Bar)).toEqual("/prefix");
    expect(Reflect.getMetadata("routes", Bar)).toEqual([]);
    expect(Reflect.getMetadata("middlewares", Bar)).toEqual([]);
  });

  it("should properly init data with middlewares", () => {
    const middleware: RequestHandler = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      next();
    };

    @Controller("/prefix", middleware)
    class Bar {}

    expect(Reflect.getMetadata("prefix", Bar)).toEqual("/prefix");
    expect(Reflect.getMetadata("routes", Bar)).toEqual([]);
    expect(Reflect.getMetadata("middlewares", Bar)).toEqual([middleware]);
  });
});
