import {
    readdir
} from "fs/promises";

export interface File {
    name: string;
    isDirectory: boolean;
}

export const changeDirectory = (directory: string) => {
    process.chdir(directory);
};

export const listDirectory = async (path: string): Promise<Array<File>> => {
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
