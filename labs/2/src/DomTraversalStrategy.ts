import {TraversalStrategy} from "./TraversalStrategy";
import xmldom from "@xmldom/xmldom";

export class DomTraversalStrategy implements TraversalStrategy {
    public getNodeIds(xml: string, regex: RegExp) {
        const parser = new xmldom.DOMParser();
        const dom = parser.parseFromString(xml);

        return this.search(dom.documentElement, regex);
    }

    private search(node: any, regex: RegExp) {
        if (node.nodeValue) {
            if (regex.test(node.nodeValue)) {
                return [this.getAncestorId(node)];
            } else {
                return [];
            }
        } else if (node.childNodes.length) {
            let result: Array<string> = [];
            for (const child of Array.from(node.childNodes)) {
                result = result.concat(this.search(child, regex));
            }
            return result;
        }
    }

    private getAncestorId(node: any): string {
        const idNode = node.parentNode.getElementsByTagName("id")[0];
        if (idNode) {
            return idNode.childNodes[0].nodeValue;
        }
        return this.getAncestorId(node.parentNode);
    }
}
