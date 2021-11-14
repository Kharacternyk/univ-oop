import {TraversalStrategy} from "./TraversalStrategy";
import sax from "sax";

export class SaxTraversalStrategy implements TraversalStrategy {
    public getNodeIds(xml: string, regex: RegExp) {
        const parser = sax.parser(false, {lowercase: true});
        const result: Array<string> = [];

        let currentNodeId: string;
        let currentTag: string;

        parser.onopentag = tag => currentTag = tag.name;
        parser.onclosetag = tag => currentTag = undefined;
        parser.ontext = text => {
            if (currentTag === "id") {
                currentNodeId = text;
            } else if (regex.test(text)) {
                result.push(currentNodeId);
            }
        }
        parser.write(xml).close();

        return result;
    }
}
