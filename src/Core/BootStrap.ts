import * as colors from 'colors'

import { Application } from './Application'

colors.enable()

export function Bootstrap(module: any) {
    console.log('Bootstrap application...\n'.yellow)

    const application = new Application()

    application.setModules([module])

    return application
}
