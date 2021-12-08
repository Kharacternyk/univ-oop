import {File} from "./file";
import {stat} from "fs/promises";

export class FileTypeDecorator extends File {
    private cachedIsDirectory: boolean | undefined;
    private cachedIsMultilingual: boolean | undefined;

    public constructor(file: File) {
        super(file.getPath());
    }

    public async isDirectory(): Promise<boolean> {
        if (this.cachedIsDirectory !== undefined) {
            return this.cachedIsDirectory;
        }

        return this.cachedIsDirectory = (await stat(this.getPath())).isDirectory();
    }

    public async isMultilingual(): Promise<boolean> {
        if (this.cachedIsMultilingual !== undefined) {
            return this.cachedIsMultilingual;
        }

        if (await this.isDirectory()) {
            return this.cachedIsMultilingual = false;
        }

        const content = await this.getContent();

        return this.cachedIsMultilingual = /[^\x00-\x7F]/.test(content);
    }
}
