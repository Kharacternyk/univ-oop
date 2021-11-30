import {resolve, basename} from "path";

export class File {
    protected readonly path: string;

    public constructor(...paths: Array<string>) {
        this.path = resolve(...paths);
    }

    public getPath(): string {
        return this.path;
    }

    public getName(): string {
        return basename(this.path);
    }
}
