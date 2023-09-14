import * as colors from 'colors'

import { Express } from 'express'
import { ApplicationCore } from '../../types/Core/ApplicationCore'
import IModulesLoaderOptions = ApplicationCore.IOContainer.ModulesLoaderOptions.IModulesLoaderOptions
import { importClassesFromDirectories } from '../utils/importClassesFromDirectories'
import { ControllersLoader } from '../HttpCore'

colors.enable()

export class ModulesLoader {
    constructor(protected readonly options: IModulesLoaderOptions) {}

    load(app: Express) {
        for (let module of this.getModules()) {
            let writeStr =
                `\n[Bootstrap module] `.underline.green +
                module.name.underline.red
            process.stdout.write(writeStr)

            const modulePrefix = Reflect.getMetadata('module_prefix', module)

            let prefix = ''

            if (this.options.prefix) {
                prefix += this.options.prefix
            }

            if (modulePrefix) {
                prefix += modulePrefix
            }

            if (Reflect.hasMetadata('controllers', module)) {
                const controllers = Reflect.getMetadata('controllers', module)

                writeStr =
                    ' [Controllers] '.green + `${controllers.length}`.gray
                process.stdout.write(writeStr)

                if (controllers && controllers.length !== 0) {
                    new ControllersLoader({
                        controllers: controllers,
                        prefix: prefix,
                    }).load(app)
                }
            }

            if (Reflect.hasMetadata('modules', module)) {
                const modules = Reflect.getMetadata('modules', module)

                writeStr = ' [Modules] '.green + `${modules.length}`.gray
                process.stdout.write(writeStr)

                if (modules && modules.length !== 0) {
                    new ModulesLoader({
                        modules: modules,
                        prefix: prefix,
                    }).load(app)
                }
            }

            process.stdout.write('\n')
        }
    }

    protected getInstance(identifier: any) {
        if (this.options.container) {
            return this.options.container.get(identifier)
        }

        return new identifier()
    }

    protected getModules() {
        const moduleClasses: Array<Function> = (
            this.options.modules as any[]
        ).filter((module) => module instanceof Function)

        return [...moduleClasses, ...this.getModulesFromDirs()]
    }

    protected getModulesFromDirs() {
        const moduleDirs = (this.options.modules as any[]).filter(
            (module) => typeof module === 'string'
        )

        return importClassesFromDirectories(moduleDirs)
    }
}
