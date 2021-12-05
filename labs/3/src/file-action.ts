import {File} from "./file"

export interface FileAction {
    execute(file: File): void;
}
