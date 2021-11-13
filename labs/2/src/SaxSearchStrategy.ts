import {SearchStrategy} from "./SearchStrategy";
import sax from "sax";

export class SaxSearchStrategy implements SearchStrategy {
    public getNodeIds(xml: string, query: string) {
        const parser = sax.parser(false, {lowercase: true});
        const result: Array<string> = [];

        let currentNodeId: string;
        let currentTag: string;

        parser.onopentag = tag => currentTag = tag.name;
        parser.onclosetag = tag => currentTag = undefined;
        parser.ontext = text => {
            if (currentTag === "id") {
                currentNodeId = text;
            } else if (text.indexOf(query) !== -1) {
                result.push(currentNodeId);
            }
        }
        parser.write(xml).close();

        return result;
    }
}
