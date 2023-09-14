export namespace HttpCore {
    export namespace IOContainer {
        export namespace Container {
            export interface IContainer {
                get(identifier: string | symbol): Function
            }
        }

        export namespace ControllersLoaderOptions {
            export interface IControllersLoaderOptions {
                controllers: Array<Function> | Array<string>
                container?: Container.IContainer
                prefix?: string
            }
        }
    }
}
