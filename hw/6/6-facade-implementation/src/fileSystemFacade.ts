import * as fs from "fs";

export class FileSystemFacade {
    private readonly storeLocations: Array<string>;

    public constructor(storeLocations: Array<string>) {
        this.storeLocations = storeLocations;
    }

    public writeFile(fileName: string, content: string) {
        for (const directory of this.storeLocations) {
            fs.writeFileSync(`${directory}/${fileName}`, content);
        }
    }

    public readFile(fileName: string) {
        let fd;
        let mtime = 0;

        for (const directory of this.storeLocations) {
            let _fd;

            try {
                _fd = fs.openSync(`${directory}/${fileName}`, "r");
            } catch {
                continue;
            }

            const _mtime = fs.fstatSync(_fd).mtimeMs;

            if (_mtime > mtime) {
                fd = _fd;
                mtime = _mtime;
            }
        }

        return fs.readFileSync(fd, {
            encoding: "utf8"
        });
    }
}
