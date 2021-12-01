import {resolve, basename} from "path";
import {rm} from "fs/promises";
import {exec} from "child_process";

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

    public remove(): Promise<void> {
        return rm(this.getPath());
    }

    public edit() {
        exec(`konsole -e "$EDITOR" -u NONE "${this.getPath()}"`);
    }
}
