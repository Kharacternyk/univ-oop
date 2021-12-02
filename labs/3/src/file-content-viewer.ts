import {readFile} from "fs/promises";
import {File} from "./file";
import {FileViewer} from "./file-viewer";

export class FileContentViewer implements FileViewer {
    public async view(file: File): Promise<Array<string>> {
        const content = await readFile(file.getPath(), {encoding: "utf-8"});

        return content.split('\n');
    }
}

