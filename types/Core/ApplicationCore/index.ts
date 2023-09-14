export namespace ApplicationCore {
    export namespace IOContainer {
        export namespace Container {
            export interface IContainer {
                get(identifier: string | symbol): Function
            }
        }

        export namespace ModulesLoaderOptions {
            export interface IModulesLoaderOptions {
                modules: Array<Function> | Array<string>
                container?: Container.IContainer
                prefix?: string
            }
        }
    }
}
