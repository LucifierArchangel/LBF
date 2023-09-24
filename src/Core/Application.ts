import express from "express";
import cors from "cors";

import * as colors from "colors";

import { Express } from "express";
import * as http from "http";
import { ModulesLoader } from "../ApplicationCore";

colors.enable();

export class Application {
  private defaultPrefix: string = "";
  private modules: Array<any> = [];
  app: Express;
  constructor() {
    console.log("Create application".gray);
    this.app = express();

    this.app.use(express.json());
  }

  setDefaultPrefix(prefix: string) {
    console.log(`Set default prefix ${prefix} for application`.gray);
    this.defaultPrefix = prefix;
  }

  setModules(modules: Array<any>) {
    this.modules = modules;
  }

  init() {
    console.log(`Init modules...\n`.gray);
    new ModulesLoader({
      modules: this.modules,
      prefix: this.defaultPrefix,
    }).load(this.app);
  }

  enableCors() {
    console.log(`Enable COR's for application`.gray);
    this.app.use(cors());
  }

  listen(port: number, callback: () => void): http.Server {
    // this.init()
    console.log(`Start listening...`.gray);
    return this.app.listen(port, callback);
  }
}
