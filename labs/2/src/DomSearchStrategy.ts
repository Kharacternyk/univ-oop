import {SearchStrategy} from "./SearchStrategy";
import xmldom from "@xmldom/xmldom";

export class DomSearchStrategy implements SearchStrategy {
    public getNodeIds(xml: string, query: string) {
        const parser = new xmldom.DOMParser();
        const dom = parser.parseFromString(xml);

        return this.search(dom.documentElement, query);
    }

    private search(node: any, query: string) {
        if (node.nodeValue) {
            if (node.nodeValue.includes(query)) {
                return [this.getAncestorId(node)];
            } else {
                return [];
            }
        } else if (node.childNodes.length) {
            let result: Array<string> = [];
            for (const child of Array.from(node.childNodes)) {
                result = result.concat(this.search(child, query));
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
