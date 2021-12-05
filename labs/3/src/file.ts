import {resolve, basename} from "path";
import {rm, readFile, writeFile} from "fs/promises";
import {Directory} from "./directory";

export class File {
    private readonly path: string;

    public constructor(...paths: Array<string>) {
        this.path = resolve(...paths);
    }

    public getPath(): string {
        return this.path;
    }

    public getParent(): Directory {
        return new Directory(this.getPath(), "..");
    }

    public getName(): string {
        return basename(this.getPath());
    }

    public getContent(): Promise<string> {
        return readFile(this.getPath(), {encoding: "utf-8"});
    }

    public setContent(content: string): Promise<void> {
        return writeFile(this.getPath(), content);
    }

    public remove(): Promise<void> {
        return rm(this.getPath());
    }
}
