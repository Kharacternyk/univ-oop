import {resolve} from "path";
import {readdir, copyFile, rmdir, rename} from "fs/promises";
import {File} from "./file";

export class Directory extends File {
    public static getCurrent(): Directory {
        return new Directory(process.cwd());
    }

    public getParent(): Directory {
        return new Directory(this.getPath(), "..");
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

    public copyHere(file: File): Promise<void> {
        return copyFile(file.getPath(), resolve(this.getPath(), file.getName()));
    }

    public moveHere(file: File): Promise<void> {
        return rename(file.getPath(), resolve(this.getPath(), file.getName()));
    }

    public remove(): Promise<void> {
        return rmdir(this.getPath());
    }
}
