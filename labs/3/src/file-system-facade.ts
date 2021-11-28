import {
    readdir
} from "fs/promises";

export interface File {
    name: string;
    isDirectory: boolean;
}

export const listDirectory = async (path: string): Promise<Array<File>> => {
    const entries = await readdir(path, {withFileTypes: true});

    return entries.map(entry => {
        return {
            name: entry.name,
            isDirectory: entry.isDirectory(),
        }
    });
}
