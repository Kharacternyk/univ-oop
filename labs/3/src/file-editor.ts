import {exec} from "child_process";
import {FileAction} from "./file-action";
import {File} from "./file";

export class FileEditor implements FileAction {
    public execute(file: File): Promise<void> {
        exec(`konsole -e "$EDITOR" -u NONE "${file.getPath()}"`);
        return Promise.resolve();
    }
}
