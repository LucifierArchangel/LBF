import * as path from "path";
import * as colors from "colors";
import { HttpCore } from "../../types/Core/HttpCore";
import IControllersLoaderOptions = HttpCore.IOContainer.ControllersLoaderOptions.IControllersLoaderOptions;
import {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { importClassesFromDirectories } from "../utils";
import { RouteDefinition } from "./RouteDefinition";

colors.enable();

/**
 * ControllersLoader class
 * Load controllers and create express routers for full route path
 */
export class ControllersLoader {
  constructor(protected readonly options: IControllersLoaderOptions) {}

  /**
   * Load controller and create method bindings for global app instance
   * @param app
   */
  load(app: Express) {
    for (const controller of this.getControllers()) {
      const instance = this.getInstance(controller);

      const prefix = Reflect.getMetadata("prefix", controller);
      const routes: Array<RouteDefinition> = Reflect.getMetadata(
        "routes",
        controller
      );
      const middlewares: Array<RequestHandler> = Reflect.getMetadata(
        "middlewares",
        controller
      );

      routes.forEach((route: RouteDefinition) => {
        const routePath = path
          .join(
            "/",
            this.options.prefix ? this.options.prefix : "",
            prefix,
            route.path
          )
          .split("\\")
          .join("/");

        console.log(`[${controller.name}]`.green, routePath.underline.red);

        app[route.requestMethod](
          routePath,
          ...middlewares,
          ...route.middlewares,
          (req: Request, res: Response, next: NextFunction) =>
            Promise.resolve(instance[route.methodName](req, res))
              .then((result) => {
                if (result) {
                  res.send({
                    status: "Ok",
                    data: result,
                  });
                } else {
                  res.send({
                    status: "Fail",
                    message: "Request returned empty data's",
                  });
                }
              })
              .catch((error) => {
                // console.log(error)
                res.send({
                  status: "Fail",
                  messages: error.message || "Internal Server Error",
                });
              })
        );
      });
    }
  }

  /**
   * Get instance
   * Return instance by identifier
   * @param identifier
   * @protected
   */
  protected getInstance(identifier: any) {
    if (this.options.container) {
      return this.options.container.get(identifier);
    }

    return new identifier();
  }

  /**
   * Get controllers array
   * Create array of classes and loaded classes from files
   * @protected
   */
  protected getControllers(): Array<Function> {
    const controllerClasses: Array<Function> = (
      this.options.controllers as any[]
    ).filter((controller) => controller instanceof Function);

    return [...controllerClasses, ...this.getControllersFromDirs()];
  }

  /**
   * Get controllers array from files
   * Load classes from files and return classes array
   * @protected
   */
  protected getControllersFromDirs(): Array<Function> {
    const controllerDirs = (this.options.controllers as any[]).filter(
      (controller) => typeof controller === "string"
    );

    return importClassesFromDirectories(controllerDirs);
  }
}
