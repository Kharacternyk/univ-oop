import {exec} from "child_process";
import {FileAction} from "./file-action";
import {File} from "./file";
import {Directory} from "./directory";

export class FileTruncator implements FileAction {
    public async execute(file: File): Promise<void> {
        const content = await file.getContent();
        let truncated = [];
        let previousLine = null;

        for (const line of content.split('\n')) {
            if (line !== previousLine) {
                truncated.push(line);
                previousLine = line;
            }
        }
        
        return file.setContent(truncated.join('\n'));
    }
}
