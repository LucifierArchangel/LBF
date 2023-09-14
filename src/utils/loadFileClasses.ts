/**
 * Create array of functions from deep structure
 * @param exported
 * @param allLoaded
 * @return Array[Function}
 */
export function loadFileClasses(
    exported: any,
    allLoaded: Array<Function>
): Array<Function> {
    if (exported instanceof Function) {
        allLoaded.push(exported)
    } else if (exported instanceof Array) {
        exported.forEach((item: any) => loadFileClasses(item, allLoaded))
    } else if (exported instanceof Object || typeof exported === 'object') {
        Object.keys(exported).forEach((key: any) =>
            loadFileClasses(exported[key], allLoaded)
        )
    }

    return allLoaded
}
