import {readdir} from "fs/promises";
import {File} from "./file";

export class Directory extends File {
    public static getCurrent(): Directory {
        return new Directory(process.cwd());
    }

    public getParent(): Directory {
        return new Directory(this.path, "..");
    }

    public async list(): Promise<Array<File>> {
        const children = await readdir(this.path, {withFileTypes: true});
        const entries = children.map(entry => {
            if (entry.isDirectory()) {
                return new Directory(this.path, entry.name);
            } else {
                return new File(this.path, entry.name);
            }
        });

        return entries;
    }
}
