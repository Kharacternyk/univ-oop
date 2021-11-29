import {
    readdir
} from "fs/promises";

import {
    resolve
} from "path";

export interface File {
    name: string;
    isDirectory: boolean;
}

export function resolvePath(directory: string) {
    return resolve(directory);
}

export function getCurrentDirectory() {
    return process.cwd();
}

export function changeDirectory (directory: string) {
    process.chdir(directory);
};

export async function listDirectory(path: string): Promise<Array<File>> {
    const entries = await readdir(path, {withFileTypes: true});
    const specialEntries = [
        {
            name: "..",
            isDirectory: true,
        },
    ];

    return specialEntries.concat(entries.map(entry => {
        return {
            name: entry.name,
            isDirectory: entry.isDirectory(),
        }
    }));
}
