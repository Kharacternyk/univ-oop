import {File} from "./file";
import {FileViewer} from "./file-viewer";
import {FileContentViewer} from "./file-content-viewer";

export class FileWordCounter implements FileViewer {
    private contentViewer = new FileContentViewer();

    public async view(file: File): Promise<Array<string>> {
        const contents = await this.contentViewer.view(file);
        const words = []

        for (const line of contents) {
            words.push(...line.split(" "));
        }

        const wordCounts = new Map<string, number>();

        for (const word of words) {
            if (!word) {
                continue;
            }

            if (wordCounts.has(word)) {
                wordCounts.set(word, wordCounts.get(word) + 1);
            } else {
                wordCounts.set(word, 1);
            }
        }

        const sortedCounts: Array<[string, number]> =
            [...wordCounts.entries()].sort(([, c1], [, c2]) => c2 - c1);

        return sortedCounts.map(value => `${value[0]}: ${value[1]}`);
    }
}
