import {FileAction} from "./file-action";
import {File} from "./file";

export class FileTagCleaner implements FileAction {
    public async execute(file: File): Promise<void> {
        const content = await file.getContent();
        let cleaned = [];

        for (const line of content.split('\n')) {
            cleaned.push(line.replace(/<[^<>]+>/g, ""));
        }
        
        return file.setContent(cleaned.join('\n'));
    }
}
