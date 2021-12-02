import {File} from "./file";

export interface FileViewer {
    view(file: File): Promise<Array<string>>;
}
