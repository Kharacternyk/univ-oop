import {resolve, basename} from "path";
import {rm, readFile} from "fs/promises";

export class File {
    private readonly path: string;

    public constructor(...paths: Array<string>) {
        this.path = resolve(...paths);
    }

    public getPath(): string {
        return this.path;
    }

    public getName(): string {
        return basename(this.getPath());
    }

    public getContent(): Promise<string> {
        return readFile(this.getPath(), {encoding: "utf-8"});
    }

    public remove(): Promise<void> {
        return rm(this.getPath());
    }
}
