import * as path from 'path'
import { loadFileClasses } from './loadFileClasses'

/**
 * Load classes from files
 * @param directories string[] List of directories for class loading
 * @param formats string[] List of file's extensions for loading classes
 * @return Function[]
 */
export function importClassesFromDirectories(
    directories: Array<string>,
    formats: Array<string> = ['.js', '.ts']
): Array<Function> {
    const allFiles = directories.reduce((allDirs, dir) => {
        return allDirs.concat(require('glob').sync(path.normalize(dir)))
    }, [] as string[])

    const dirs = allFiles
        .filter((file) => {
            const dtsExtension = file.substring(file.length - 5, file.length)
            return (
                formats.indexOf(path.extname(file)) !== -1 &&
                dtsExtension !== '.d.ts'
            )
        })
        .map((file) => {
            return require(file)
        })

    return loadFileClasses(dirs, [])
}
