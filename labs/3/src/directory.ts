import {resolve} from "path";
import {readdir, copyFile, rmdir, rename} from "fs/promises";
import {File} from "./file";

export class Directory extends File {
    public static getCurrent(): Directory {
        return new Directory(process.cwd());
    }

    public async list(): Promise<Array<File>> {
        const children = await readdir(this.getPath(), {withFileTypes: true});
        const entries = children.map(entry => {
            if (entry.isDirectory()) {
                return new Directory(this.getPath(), entry.name);
            } else {
                return new File(this.getPath(), entry.name);
            }
        });

        return entries;
    }

    public async copyHere(file: File): Promise<File> {
        const path = resolve(this.getPath(), file.getName());
        await copyFile(file.getPath(), path);
        return new File(path);
    }

    public async moveHere(file: File): Promise<File> {
        const path = resolve(this.getPath(), file.getName());
        await rename(file.getPath(), path);
        return new File(path);
    }

    public remove(): Promise<void> {
        return rmdir(this.getPath());
    }
}
