import {File} from "./file";
import {FileViewer} from "./file-viewer";
import {FileContentViewer} from "./file-content-viewer";

export class FileShortcutsHighlighter implements FileViewer {
    private contentViewer = new FileContentViewer();
    private highlighterStart: string;
    private highlighterEnd: string;

    public constructor(highlighterStart: string, highlighterEnd: string) {
        this.highlighterStart = highlighterStart;
        this.highlighterEnd = highlighterEnd;
    }

    public async view(file: File): Promise<Array<string>> {
        const contents = await this.contentViewer.view(file);
        const highlightedLines = [];

        for (const line of contents) {
            const words = line.split(" ");
            const highlightedWords = [];

            for (const word of words) {
                const tail = word.slice(1);
                const isShortcut = tail !== tail.toUpperCase() && tail !== tail.toLowerCase();

                if (isShortcut) {
                    highlightedWords.push(this.highlighterStart + word + this.highlighterEnd);
                } else {
                    highlightedWords.push(word);
                }
            }

            highlightedLines.push(highlightedWords.join(" "));
        }

        return highlightedLines;
    }
}


