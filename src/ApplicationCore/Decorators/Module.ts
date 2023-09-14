export function Module(
    options: {
        // tslint:disable-next-line:ban-types
        controllers: Function[]
        modules?: any[]
        prefix?: string
    } = {
        controllers: [],
        modules: [],
        prefix: '',
    }
): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata('module', '', target)

        if (
            !Reflect.hasMetadata('module_prefix', target) &&
            options.prefix !== ''
        ) {
            Reflect.defineMetadata('module_prefix', options.prefix, target)
        }

        if (
            !Reflect.hasMetadata('controllers', target) &&
            options.controllers.length !== 0
        ) {
            Reflect.defineMetadata('controllers', options.controllers, target)
        }

        if (
            !Reflect.hasMetadata('modules', target) &&
            options.modules &&
            options.modules.length !== 0
        ) {
            Reflect.defineMetadata('modules', options.modules, target)
        }
    }
}
